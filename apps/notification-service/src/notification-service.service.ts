// apps/notification-service/src/notification.service.ts
import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService } from 'libs/prisma/prisma.service';

@Injectable()
export class NotificationService {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        private readonly prisma: PrismaService,
        @Inject('NOTIFICATION_SERVICE') private readonly client: ClientProxy,
    ) { }

    // async logNotification(data: {
    //     userId: string;
    //     type: string;
    //     channel: string;
    //     status: string;
    //     metadata?: any;
    // }): Promise<void> {
    //     try {
    //         await this.prisma.notificationLog.create({
    //             data: {
    //                 userId: data.userId,
    //                 type: data.type,
    //                 channel: data.channel,
    //                 status: data.status,
    //                 metadata: data.metadata || {},
    //                 createdAt: new Date(),
    //             },
    //         });
    //     } catch (error) {
    //         this.logger.error('Failed to log notification:', error);
    //     }
    // }

    // async scheduleRetry(data: {
    //     event: string;
    //     data: any;
    //     retryCount: number;
    // }): Promise<void> {
    //     const maxRetries = 3;
    //     if (data.retryCount >= maxRetries) {
    //         this.logger.error(`Max retries reached for event: ${data.event}`);
    //         await this.logNotification({
    //             userId: data.data.userId,
    //             type: 'EMAIL',
    //             channel: 'RETRY_FAILED',
    //             status: 'FAILED',
    //             metadata: {
    //                 event: data.event,
    //                 retryCount: data.retryCount,
    //             },
    //         });
    //         return;
    //     }

    //     // Schedule retry with exponential backoff
    //     const delay = Math.pow(2, data.retryCount) * 1000; // 1s, 2s, 4s
    //     setTimeout(() => {
    //         this.client.emit('notification.retry', {
    //             ...data,
    //             retryCount: data.retryCount + 1,
    //         });
    //     }, delay);

    //     this.logger.log(
    //         `Scheduled retry for ${data.event} in ${delay}ms (attempt ${data.retryCount + 1})`,
    //     );
    // }

    async retryFailedNotification(notificationId: string, retryCount: number): Promise<void> {
        // Implementation for retry logic
        this.logger.log(`Retrying notification ${notificationId} (attempt ${retryCount})`);
        // Fetch and retry the notification
    }
}