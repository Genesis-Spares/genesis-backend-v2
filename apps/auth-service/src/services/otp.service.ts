// apps/auth-service/src/otp.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class OTPService {
    private readonly OTP_LENGTH = 6;
    private readonly OTP_EXPIRY_MINUTES = 15;
    private readonly MAX_ATTEMPTS = 3;

    constructor(
        private readonly prisma: PrismaService,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
    ) { }

    async generateAndSendOTP(data: {
        email: string;
        userId?: string;
        type: string;
        firstName?: string;
    }) {
        // Check for existing active OTP
        const existingOTP = await this.prisma.oTP.findFirst({
            where: {
                email: data.email,
                type: data.type,
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        // If OTP exists and not expired, reuse it or create new
        if (existingOTP) {
            // Check if we should reuse or create new
            const createdAt = existingOTP.createdAt;
            const timeSinceCreation = Date.now() - createdAt.getTime();
            if (timeSinceCreation < 60000) { // 1 minute
                // Reuse the same OTP if it's less than 1 minute old
                // This prevents spamming
                return existingOTP;
            }
        }

        // Generate new OTP
        const code = this.generateOTP();
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + this.OTP_EXPIRY_MINUTES);

        // Save OTP to database (upsert to handle existing used/expired ones)
        const otp = await this.prisma.oTP.upsert({
            where: {
                email_type: {
                    email: data.email,
                    type: data.type,
                }
            },
            create: {
                userId: data.userId || data.email, // For users not yet registered
                email: data.email,
                code,
                type: data.type,
                expiresAt,
                used: false,
                attempts: 0,
            },
            update: {
                code,
                expiresAt,
                used: false,
                attempts: 0,
                createdAt: new Date(), // Reset creation time
            }
        });

        // Send OTP via email
        this.notificationClient.emit('auth.otp.send', {
            email: data.email,
            firstName: data.firstName || 'User',
            otp: code,
            type: data.type,
            expiresInMinutes: this.OTP_EXPIRY_MINUTES,
        });

        return otp;
    }

    async verifyOTP(data: {
        email: string;
        code: string;
        type: string;
    }): Promise<{ valid: boolean; userId?: string }> {
        const otp = await this.prisma.oTP.findFirst({
            where: {
                email: data.email,
                type: data.type,
                used: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: 'desc' },
        });

        if (!otp) {
            throw new RpcException({
                statusCode: 400,
                message: 'OTP not found or expired',
                error: 'Bad Request',
            });
        }

        // Check attempts
        if (otp.attempts >= this.MAX_ATTEMPTS) {
            // Mark as used to prevent further attempts
            await this.prisma.oTP.update({
                where: { id: otp.id },
                data: { used: true },
            });
            throw new RpcException({
                statusCode: 400,
                message: 'Too many failed attempts. Please request a new OTP.',
                error: 'Bad Request',
            });
        }

        // Verify code
        if (otp.code !== data.code) {
            // Increment attempts
            await this.prisma.oTP.update({
                where: { id: otp.id },
                data: { attempts: { increment: 1 } },
            });

            const remainingAttempts = this.MAX_ATTEMPTS - (otp.attempts + 1);
            throw new RpcException({
                statusCode: 400,
                message: `Invalid OTP. ${remainingAttempts} attempts remaining.`,
                error: 'Bad Request',
            });
        }

        // Mark OTP as used
        await this.prisma.oTP.update({
            where: { id: otp.id },
            data: { used: true },
        });

        return {
            valid: true,
            userId: otp.userId,
        };
    }

    async invalidateUserOTPs(userId: string, type?: string) {
        await this.prisma.oTP.updateMany({
            where: {
                userId,
                ...(type && { type }),
                used: false,
            },
            data: {
                used: true,
            },
        });
    }

    private generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}