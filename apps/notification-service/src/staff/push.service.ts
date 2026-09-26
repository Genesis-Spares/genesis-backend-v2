import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as webpush from 'web-push';
import { PrismaService } from '../../libs/prisma/prisma.service';

export interface PushMessage {
    title: string;
    body: string;
    /** dashboard path opened when the notification is tapped */
    url?: string | null;
    /** notifications with the same tag replace each other on the device */
    tag?: string;
}

export interface BrowserSubscription {
    endpoint: string;
    keys: { p256dh: string; auth: string };
}

const VAPID_KEY = 'vapid_keys';

/**
 * Web Push delivery. VAPID keys come from VAPID_PUBLIC_KEY / VAPID_PRIVATE_KEY when set;
 * otherwise a pair is generated once and kept in app_settings, so push works with no
 * extra deploy configuration and the keys stay stable across restarts.
 */
@Injectable()
export class PushService implements OnModuleInit {
    private readonly logger = new Logger(PushService.name);
    private publicKey = '';

    constructor(
        private readonly prisma: PrismaService,
        private readonly config: ConfigService,
    ) { }

    async onModuleInit() {
        let pub = this.config.get<string>('VAPID_PUBLIC_KEY');
        let priv = this.config.get<string>('VAPID_PRIVATE_KEY');
        if (!pub || !priv) {
            const stored = await this.prisma.appSetting.findUnique({ where: { key: VAPID_KEY } });
            if (stored) {
                ({ publicKey: pub, privateKey: priv } = JSON.parse(stored.value) as { publicKey: string; privateKey: string });
            } else {
                const keys = webpush.generateVAPIDKeys();
                await this.prisma.appSetting.create({ data: { key: VAPID_KEY, value: JSON.stringify(keys) } });
                ({ publicKey: pub, privateKey: priv } = keys);
                this.logger.log('Generated a VAPID key pair for web push (stored in app_settings)');
            }
        }
        const contact = this.config.get<string>('VAPID_SUBJECT')
            || `mailto:${this.config.get<string>('SUPPORT_INBOX_EMAIL') || 'admin@genisis.space'}`;
        if (!pub || !priv) throw new Error('VAPID keys unavailable');
        webpush.setVapidDetails(contact.startsWith('mailto:') || contact.startsWith('https:') ? contact : `mailto:${contact}`, pub, priv);
        this.publicKey = pub;
    }

    getPublicKey() {
        return this.publicKey;
    }

    async subscribe(userId: string, permissions: string[], sub: BrowserSubscription, userAgent?: string | null) {
        if (!sub?.endpoint?.startsWith('https://') || !sub.keys?.p256dh || !sub.keys?.auth) {
            throw new Error('Invalid push subscription');
        }
        const data = {
            userId,
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth,
            permissions,
            userAgent: userAgent?.slice(0, 300) ?? null,
            failureCount: 0,
        };
        // upsert by endpoint: re-subscribing refreshes the owner and their current permissions
        await this.prisma.pushSubscription.upsert({
            where: { endpoint: sub.endpoint },
            create: { endpoint: sub.endpoint, ...data },
            update: data,
        });
    }

    async unsubscribe(userId: string, endpoint: string) {
        await this.prisma.pushSubscription.deleteMany({ where: { userId, endpoint } });
    }

    /** Send to every subscribed device whose owner can see `permission` (null = everyone). */
    async sendToStaff(permission: string | null, msg: PushMessage, onlyUserId?: string) {
        const subs = await this.prisma.pushSubscription.findMany({
            where: {
                ...(onlyUserId ? { userId: onlyUserId } : {}),
                ...(permission ? { permissions: { has: permission } } : {}),
            },
        });
        if (!subs.length) return { sent: 0, failed: 0 };
        const payload = JSON.stringify({
            title: msg.title,
            body: msg.body,
            url: msg.url || '/dashboard',
            tag: msg.tag,
            icon: '/icons/icon-192.png',
            badge: '/icons/badge-72.png',
        });
        let sent = 0;
        let failed = 0;
        await Promise.all(subs.map(async (s) => {
            try {
                await webpush.sendNotification(
                    { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
                    payload,
                    { TTL: 24 * 3600, urgency: 'high' },
                );
                sent++;
                await this.prisma.pushSubscription.update({ where: { id: s.id }, data: { lastSuccessAt: new Date(), failureCount: 0 } });
            } catch (e) {
                failed++;
                const status = (e as { statusCode?: number }).statusCode;
                if (status === 404 || status === 410) {
                    // the browser dropped this subscription (app uninstalled, permission revoked…)
                    await this.prisma.pushSubscription.delete({ where: { id: s.id } }).catch(() => undefined);
                } else {
                    const row = await this.prisma.pushSubscription.update({ where: { id: s.id }, data: { failureCount: { increment: 1 } } }).catch(() => null);
                    if (row && row.failureCount >= 10) await this.prisma.pushSubscription.delete({ where: { id: s.id } }).catch(() => undefined);
                    this.logger.warn(`Push to ${s.endpoint.slice(0, 60)}… failed (${status ?? (e as Error).message})`);
                }
            }
        }));
        return { sent, failed };
    }
}
