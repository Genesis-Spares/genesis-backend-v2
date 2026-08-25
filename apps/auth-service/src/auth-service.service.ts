import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'libs/prisma/prisma.service';
import { RegisterDto } from './dto/Register.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import bcrypt from 'bcrypt';
import { AuthTokens, JwtPayload } from './dto/JwtPayload.type';
import * as crypto from 'crypto';
import { LoginDto } from './dto/Login.dtio';
import { timeStamp } from 'console';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL_DAYS = 30;

@Injectable()
export class AuthService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
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
                roles: { create: { roleId: defaultRole.id } }
            }
        })

        this.notificationClient.emit('auth.user.registered', {
            userId: user.id,
            email: user.email,
            firstName: user.firstname
        });

        return this.issueTokens(user.id);
    }

    async login(dto: LoginDto): Promise<AuthTokens> {
        const user = await this.prisma.user.findUniqueOrThrow({
            where: { email: dto.email },
        });
        if (!user || !user.isActive) {
            throw new RpcException("Invalid Credentials")
        }

        const passwordValid = await bcrypt.compare(dto.password, user.password);
        if (!passwordValid) {
            throw new RpcException("Invalid Credentials");
        }
        return this.issueTokens(user.id)
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
                }
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
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            roles,
            permissions
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
