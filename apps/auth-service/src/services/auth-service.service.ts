import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { RegisterDto, ResetPasswordDto } from '../dto/Register.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import bcrypt from 'bcrypt';
import { AuthTokens, JwtPayload } from '../dto/JwtPayload.type';
import * as crypto from 'crypto';
import { LoginDto } from '../dto/Login.dtio';
import { OTPService } from './otp.service';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL_DAYS = 30;

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly otpService: OTPService,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
        @Inject('CUSTOMER_SERVICE') private readonly customerClient: ClientProxy,
    ) { }

    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });

        if (existing) {
            throw new RpcException({
                statusCode: 400,
                message: "An account with this email already exists",
                error: "Bad Request",
                timeStamp: new Date().toISOString(),
                path: "auth.register"
            });
        }

        const passwordHash = await bcrypt.hash(dto.password, 12);

        const defaultRole = await this.prisma.role.upsert({
            where: { name: 'customer' },
            update: {},
            create: { name: 'customer', description: 'Default storefront customer' },
        });

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: passwordHash,
                firstname: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                isActive: false,
                isEmailVerified: false,
                roles: { create: { roleId: defaultRole.id } }
            }
        })

        // Generate and send OTP for email verification
        await this.otpService.generateAndSendOTP({
            email: user.email,
            userId: user.id,
            type: 'REGISTER',
            firstName: user.firstname,
        })

        this.notificationClient.emit('auth.user.registered', {
            userId: user.id,
            email: user.email,
            firstName: user.firstname
        });

        return {
            success: true,
            message: 'Registration successful. Please verify your email with the OTP sent.',
            userId: user.id,
            email: user.email,
            requiresVerification: true,
        };

    }

    async verifyEmail(data: { email: string; code: string }) {
        // Verify OTP
        const { valid, userId } = await this.otpService.verifyOTP({
            email: data.email,
            code: data.code,
            type: 'REGISTER',
        });

        if (!valid || !userId) {
            throw new RpcException({
                statusCode: 400,
                message: 'Invalid OTP',
                error: 'Bad Request',
            });
        }

        // Update user to be active and email verified
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                isActive: true,
                isEmailVerified: true,
            },
            include: {
                roles: {
                    include: {
                        role: true,
                    },
                },
            },
        });

        const isCustomer = user.roles.some((ur) => ur.role.name === 'customer');
        if (isCustomer) {
            // Emit directly to customer-service via TCP (not Redis/notification-service)
            this.customerClient.emit('auth.user.verified.customer', {
                userId: user.id,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastName,
                phone: user.phone,
            });

            console.log(`📧 Customer creation event emitted for user: ${user.email}`);
        }

        // ✅ Now issue tokens since email is verified
        const tokens = await this.issueTokens(user.id);

        return {
            success: true,
            message: 'Email verified successfully',
            ...tokens,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstname,
                lastName: user.lastName,
            },
        };
    }

    async resendOTP(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new RpcException({
                statusCode: 404,
                message: 'User not found',
                error: 'Not Found',
            });
        }

        if (user.isEmailVerified) {
            throw new RpcException({
                statusCode: 400,
                message: 'Email already verified',
                error: 'Bad Request',
            });
        }

        await this.otpService.generateAndSendOTP({
            email: user.email,
            userId: user.id,
            type: 'REGISTER',
            firstName: user.firstname,
        });

        return {
            success: true,
            message: 'OTP sent successfully',
        };
    }


    async login(dto: LoginDto): Promise<AuthTokens> {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            throw new RpcException({
                statusCode: 401,
                message: 'Invalid credentials',
                error: 'Unauthorized',
            });
        }

        if (!user.isEmailVerified) {
            await this.otpService.generateAndSendOTP({
                email: user.email,
                userId: user.id,
                type: 'REGISTER',
                firstName: user.firstname,
            });

            throw new RpcException({
                statusCode: 403,
                message: 'Email not verified. A new OTP has been sent to your email.',
                error: 'Forbidden',
            });
        }

        if (!user.isActive) {
            throw new RpcException({
                statusCode: 403,
                message: 'Account is deactivated',
                error: 'Forbidden',
            });
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password);
        if (!passwordValid) {
            throw new RpcException({
                statusCode: 401,
                message: 'Invalid credentials',
                error: 'Unauthorized',
            });

        }
        return this.issueTokens(user.id)
    }

    async requestPasswordReset(email: string) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        // Security: Don't reveal if user exists or not
        if (!user) {
            return {
                success: true,
                message: 'If an account exists, a password reset OTP has been sent.',
            };
        }

        // Generate and send OTP for password reset
        await this.otpService.generateAndSendOTP({
            email: user.email,
            userId: user.id,
            type: 'FORGOT_PASSWORD',
            firstName: user.firstname,
        });

        return {
            success: true,
            message: 'If an account exists, a password reset OTP has been sent.',
        };
    }

    async resetPassword(dto: ResetPasswordDto) {
        // Validate passwords match
        if (dto.newPassword !== dto.confirmPassword) {
            throw new RpcException({
                statusCode: 400,
                message: 'Passwords do not match',
                error: 'Bad Request',
            });
        }

        // Verify OTP
        const { valid, userId } = await this.otpService.verifyOTP({
            email: dto.email,
            code: dto.code,
            type: 'FORGOT_PASSWORD',
        });

        if (!valid || !userId) {
            throw new RpcException({
                statusCode: 400,
                message: 'Invalid or expired OTP',
                error: 'Bad Request',
            });
        }

        // Get user
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new RpcException({
                statusCode: 404,
                message: 'User not found',
                error: 'Not Found',
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(dto.newPassword, 12);

        // Update user password and invalidate all refresh tokens
        await this.prisma.$transaction([
            // Update password
            this.prisma.user.update({
                where: { id: userId },
                data: {
                    password: hashedPassword,
                },
            }),
            // Invalidate all refresh tokens for security
            this.prisma.refreshToken.updateMany({
                where: {
                    userId: userId,
                    revoked: false,
                },
                data: {
                    revoked: true,
                },
            }),
            // Invalidate all OTPs for this user
            this.prisma.oTP.updateMany({
                where: {
                    userId: userId,
                    used: false,
                },
                data: {
                    used: true,
                },
            }),
        ]);

        // Send notification about password change
        this.notificationClient.emit('auth.password.changed', {
            userId: user.id,
            email: user.email,
            firstName: user.firstname,
        });

        return {
            success: true,
            message: 'Password reset successfully. Please login with your new password.',
        };
    }

    async refresh(refreshToken: string): Promise<AuthTokens> {
        // ✅ Add timeout and better error handling
        try {
            const tokenHash = this.hashToken(refreshToken);

            const stored = await this.prisma.refreshToken.findFirst({
                where: {
                    tokenHash,
                    revoked: false,
                    expiresAt: { gt: new Date() }
                },
            });

            if (!stored) {
                throw new RpcException({
                    statusCode: 401,
                    message: "Refresh token is invalid or expired",
                    error: "Unauthorized"
                });
            }

            // ✅ Update in a transaction to ensure consistency
            await this.prisma.$transaction([
                this.prisma.refreshToken.update({
                    where: { id: stored.id },
                    data: { revoked: true }
                })
            ]);

            return this.issueTokens(stored.userId);
        } catch (error) {
            if (error instanceof RpcException) throw error;
            throw new RpcException({
                statusCode: 500,
                message: "Failed to refresh token",
                error: "Internal Server Error"
            });
        }
    }



    private async issueTokens(userId: string): Promise<AuthTokens> {
        // ✅ Optimized: Only fetch what's needed
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                isActive: true,
                roles: {
                    select: {
                        role: {
                            select: {
                                name: true,
                                permissions: {
                                    select: {
                                        permission: {
                                            select: {
                                                resource: true,
                                                action: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                isEmailVerified: true,
            }
        });

        if (!user) {
            throw new RpcException({
                statusCode: 404,
                message: "User not found",
                error: "Not Found"
            });
        }

        // Extract roles and permissions
        const roles = user.roles.map((ur) => ur.role.name);
        const permissions = Array.from(
            new Set(
                user.roles.flatMap((ur) =>
                    ur.role.permissions.map((rp) =>
                        `${rp.permission.resource}:${rp.permission.action}`
                    )
                )
            )
        );

        // Create payload
        const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
            sub: user.id,
            email: user.email,
            roles,
            permissions,
            emailVerified: user.isEmailVerified,
        };

        // Generate tokens
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: ACCESS_TOKEN_TTL }),
            this.generateRefreshToken()
        ]);

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_TTL_DAYS);

        // Store refresh token
        await this.prisma.refreshToken.create({
            data: {
                userId: user.id,
                tokenHash: this.hashToken(refreshToken),
                expiresAt
            },
        });

        return { accessToken, refreshToken };
    }



    private async generateRefreshToken(): Promise<string> {
        return crypto.randomBytes(48).toString('hex');
    }


    private hashToken(token: string): string {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}
