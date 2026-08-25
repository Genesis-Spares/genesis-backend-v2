import { Controller, Get, Logger } from '@nestjs/common';
import { NotificationService } from './notification-service.service';
import { EmailService } from './email.service';
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
            // await this.notificationService.logNotification({
            //     userId: data.userId,
            //     type: 'EMAIL',
            //     channel: 'WELCOME',
            //     status: 'SENT',
            //     metadata: { email: data.email },
            // });
            this.logger.log(`Welcome email sent to ${data.email}`);
        } catch (error) {
            this.logger.error(`Failed to send welcome email to ${data.email}:`, error);
            // await this.notificationService.logNotification({
            //     userId: data.userId,
            //     type: 'EMAIL',
            //     channel: 'WELCOME',
            //     status: 'FAILED',
            //     metadata: { email: data.email, error: error.message },
            // });
            // // Retry logic
            // await this.notificationService.scheduleRetry({
            //     event: 'auth.user.registered',
            //     data,
            //     retryCount: 0,
            // });
        }
    }

}
