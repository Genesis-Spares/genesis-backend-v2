import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationService } from './services/notification-service.service';
import { EmailService } from './services/email.service';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class NotificationController {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        private readonly notificationService: NotificationService,
        private readonly emailService: EmailService,
    ) { }

    @EventPattern('auth.user.registered')
    async handleUserRegistered(@Payload() data: any) {
        this.logger.log(`Processing user registration email for: ${data.email}`);
        try {
            await this.emailService.sendWelcomeEmail(data.email, data.firstName);
            await this.notificationService.logNotification({
                userId: data.userId,
                type: 'EMAIL',
                channel: 'WELCOME',
                status: 'SENT',
                metadata: { email: data.email },
            });
            this.logger.log(`Welcome email sent to ${data.email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email to ${data.email}:`, error);
            await this.notificationService.logNotification({
                userId: data.userId,
                type: 'EMAIL',
                channel: 'WELCOME',
                status: 'FAILED',
                metadata: { email: data.email, error: error.message },
            });
            // Retry logic
            await this.notificationService.scheduleRetry({
                event: 'auth.user.registered',
                data,
                retryCount: 0,
            });
        }
    }

    // ✅ New: Handle OTP sending
    @EventPattern('auth.otp.send')
    async handleOTPSend(@Payload() data: any) {
        this.logger.log(`Processing OTP for: ${data.email}`);
        try {
            await this.emailService.sendOTPEmail(
                data.email,
                data.firstName,
                data.otp,
                data.type,
                data.expiresInMinutes
            );
            await this.notificationService.logNotification({
                userId: data.userId || data.email,
                type: 'EMAIL',
                channel: 'OTP',
                status: 'SENT',
                metadata: {
                    email: data.email,
                    type: data.type,
                    expiresInMinutes: data.expiresInMinutes
                },
            });
            this.logger.log(`OTP email sent to ${data.email}`);
        } catch (error) {
            this.logger.error(`Failed to send OTP to ${data.email}:`, error);
            await this.notificationService.logNotification({
                userId: data.userId || data.email,
                type: 'EMAIL',
                channel: 'OTP',
                status: 'FAILED',
                metadata: {
                    email: data.email,
                    error: error.message
                },
            });
            await this.notificationService.scheduleRetry({
                event: 'auth.otp.send',
                data,
                retryCount: 0,
            });
        }
    }

    // Forgot password email
    @EventPattern('auth.password.reset')
    async handlePasswordReset(@Payload() data: any) {
        const { userId, email, firstName, resetToken, resetUrl } = data;
        await this.emailService.sendPasswordResetEmail(email, firstName, resetUrl);

        await this.notificationService.logNotification({
            userId: data.userId,
            type: 'EMAIL',
            channel: 'PASSWORD_RESET',
            status: 'SENT',
            metadata: { email: data.email },
        });
        this.logger.log(`Password reset email sent to ${data.email}`);
    }

}
