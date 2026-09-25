// apps/auth-service/src/otp.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../libs/prisma/prisma.service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import * as crypto from 'crypto';

@Injectable()
export class OTPService {
    private readonly OTP_LENGTH = 6;
    private readonly OTP_EXPIRY_MINUTES = 15;
    private readonly MAX_ATTEMPTS = 3;
    // Invitations are a link, not a code the user types in, so they get a
    // much longer window than a regular OTP — 24-48h per the spec.
    private readonly INVITE_EXPIRY_HOURS = 48;

    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
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

    /**
     * Admin-created-user invitation: unlike generateAndSendOTP, this issues a
     * long single-use random TOKEN (not a 6-digit code) embedded in a link,
     * stored in the same `otps` table under type 'INVITE' so it reuses the
     * existing used/expiresAt/upsert machinery. One active invite per email,
     * same as every other OTP type — calling this again (e.g. "resend")
     * simply replaces the row and restarts the 48h clock.
     */
    async generateAndSendInviteLink(data: { email: string; userId: string; firstName?: string }) {
        const token = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + this.INVITE_EXPIRY_HOURS);

        const otp = await this.prisma.oTP.upsert({
            where: {
                email_type: {
                    email: data.email,
                    type: 'INVITE',
                },
            },
            create: {
                userId: data.userId,
                email: data.email,
                code: token,
                type: 'INVITE',
                expiresAt,
                used: false,
                attempts: 0,
            },
            update: {
                code: token,
                expiresAt,
                used: false,
                attempts: 0,
                createdAt: new Date(),
            },
        });

        const dashboardUrl = this.config.get<string>('DASHBOARD_URL', 'http://localhost:3000');
        const inviteUrl = `${dashboardUrl}/verify-invite?token=${token}`;

        this.notificationClient.emit('auth.invite.send', {
            userId: data.userId,
            email: data.email,
            firstName: data.firstName || 'there',
            inviteUrl,
            expiresInHours: this.INVITE_EXPIRY_HOURS,
        });

        return otp;
    }

    /** Looks the invite up by token alone — the link carries no email/id. */
    async verifyInviteToken(token: string): Promise<{ valid: boolean; userId?: string }> {
        const otp = await this.prisma.oTP.findFirst({
            where: {
                code: token,
                type: 'INVITE',
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (!otp) {
            throw new RpcException({
                statusCode: 400,
                message: 'This invitation link is invalid or has expired. Ask an admin to resend your invite.',
                error: 'Bad Request',
            });
        }

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