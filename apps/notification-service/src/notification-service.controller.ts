import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from './services/notification-service.service';
import { EmailService } from './services/email.service';
import { SmsService } from './services/sms.service';
import { buildOrderMessage, kindFor, type OrderEvent } from './services/order-messages';
import { EventPattern, Payload } from '@nestjs/microservices';


@Controller()
export class NotificationController {
    private readonly logger = new Logger(NotificationService.name);

    constructor(
        private readonly notificationService: NotificationService,
        private readonly emailService: EmailService,
        private readonly smsService: SmsService,
        private readonly config: ConfigService,
    ) { }

    // ============================================
    // CONTACT FORM (emitted by the customer service)
    // ============================================

    // ============================================
    // LOW STOCK (emitted by the product service)
    // ============================================

    @EventPattern('inventory.low_stock')
    async handleLowStock(@Payload() d: { products: { productId: string; sku: string; name: string; stockAfter: number; reorderLevel: number }[]; cause: string }) {
        const to = this.config.get<string>('STOCK_ALERT_EMAIL') || this.config.get<string>('SUPPORT_INBOX_EMAIL');
        const phone = this.config.get<string>('STOCK_ALERT_PHONE');
        if (!d?.products?.length || (!to && !phone)) return;
        const dashboard = (this.config.get<string>('DASHBOARD_URL') || 'http://localhost:3001').replace(/\/$/, '');
        const lines = d.products.map((p) => `• ${p.name} (${p.sku}) — ${p.stockAfter <= 0 ? 'OUT OF STOCK' : `${p.stockAfter} left`} (reorder at ${p.reorderLevel})`).join('\n');
        const out = d.products.filter((p) => p.stockAfter <= 0).length;
        const subject = `${out ? `${out} out of stock, ` : ''}${d.products.length} product${d.products.length === 1 ? '' : 's'} need reordering`;

        if (to) {
            try {
                await this.emailService.sendSupportEmail(to, `[Stock] ${subject}`, {
                    headline: 'Time to reorder', staff: false,
                    intro: `These products just dropped to their reorder level (after ${d.cause}):`,
                    reference: new Date().toLocaleDateString('en-KE', { day: 'numeric', month: 'short', year: 'numeric' }),
                    subject: 'Low stock', body: lines, cta: 'Open inventory', ctaUrl: `${dashboard}/inventory?filter=low`,
                    footnote: 'Sent when a product crosses its reorder level. Set reorder levels per product in the dashboard.',
                    year: new Date().getFullYear(),
                }, `${subject}\n\n${lines}\n\n${dashboard}/inventory?filter=low`);
                await this.notificationService.logNotification({ userId: 'staff', type: 'EMAIL', channel: 'LOW_STOCK', status: 'SENT', metadata: { skus: d.products.map((p) => p.sku), to } }).catch(() => undefined);
            } catch (e) {
                await this.notificationService.logNotification({ userId: 'staff', type: 'EMAIL', channel: 'LOW_STOCK', status: 'FAILED', metadata: { error: (e as Error).message } }).catch(() => undefined);
            }
        }
        if (phone) {
            const sms = await this.smsService.send(phone, `Genesis stock: ${d.products.slice(0, 3).map((p) => `${p.sku} ${p.stockAfter} left`).join(', ')}${d.products.length > 3 ? ` +${d.products.length - 3} more` : ''}`);
            if (sms.status !== 'SKIPPED') await this.notificationService.logNotification({ userId: 'staff', type: 'SMS', channel: 'LOW_STOCK', status: sms.status, metadata: { detail: sms.detail } }).catch(() => undefined);
        }
    }

    // ============================================
    // RETURNS (emitted by the order service)
    // ============================================

    @EventPattern('return.status.changed')
    async handleReturnStatus(@Payload() r: {
        rmaNumber: string; status: string; reason: string; items: { name: string; quantity: number }[];
        instructions?: string | null; rejectReason?: string | null; refundAmount?: number | null; currency: string;
        orderNumber: string; customerId: string; email: string; name: string; orderUrl: string;
    }) {
        if (!r?.email) return;
        const first = (r.name || '').split(' ')[0] || 'there';
        const money = (n: number) => (r.currency === 'KES' ? `KSh ${Math.round(n).toLocaleString('en-KE')}` : `${r.currency} ${n.toFixed(2)}`);
        const itemsText = r.items.map((i) => `• ${i.quantity} × ${i.name}`).join('\n');
        const copy: Record<string, { subject: string; headline: string; intro: string; body: string; footnote: string }> = {
            REQUESTED: {
                subject: `Return ${r.rmaNumber} received — we're reviewing it`,
                headline: 'We\'ve received your return request',
                intro: `Hi ${first}, thanks for letting us know. We'll review your request for order ${r.orderNumber} and get back to you, usually within one business day.`,
                body: `Reason: ${r.reason}\n\n${itemsText}`,
                footnote: 'Please keep the part(s) unfitted and in the original packaging until we reply.',
            },
            APPROVED: {
                subject: `Return ${r.rmaNumber} approved — next steps`,
                headline: 'Your return is approved',
                intro: `Hi ${first}, good news — your return for order ${r.orderNumber} has been approved. Here's how to send the part(s) back:`,
                body: `${r.instructions ?? ''}\n\n${itemsText}`,
                footnote: `Quote ${r.rmaNumber} when you drop off or send the part(s).`,
            },
            REJECTED: {
                subject: `Update on return ${r.rmaNumber}`,
                headline: 'We couldn\'t accept this return',
                intro: `Hi ${first}, we've reviewed your return request for order ${r.orderNumber} and unfortunately can't accept it:`,
                body: `${r.rejectReason ?? ''}\n\n${itemsText}`,
                footnote: 'If you think this is a mistake, just reply to this email and our team will take another look.',
            },
            RECEIVED: {
                subject: `We've received your returned part(s) — ${r.rmaNumber}`,
                headline: 'Your returned part(s) arrived',
                intro: `Hi ${first}, we've received the part(s) for return ${r.rmaNumber}. We'll process your refund shortly and email you when it's sent.`,
                body: itemsText,
                footnote: 'Refunds go back to your original payment method.',
            },
            REFUNDED: {
                subject: `Refund issued for return ${r.rmaNumber}`,
                headline: 'Your refund has been issued',
                intro: `Hi ${first}, we've refunded ${money(r.refundAmount ?? 0)} for return ${r.rmaNumber} (order ${r.orderNumber}). Depending on your bank or M-Pesa it can take a few days to show.`,
                body: itemsText,
                footnote: 'Thanks for shopping with Genesis.',
            },
        };
        const c = copy[r.status];
        if (!c) return;
        try {
            await this.emailService.sendSupportEmail(
                r.email,
                c.subject,
                { headline: c.headline, intro: c.intro, reference: r.rmaNumber, subject: `Order ${r.orderNumber}`, body: c.body, footnote: c.footnote, cta: 'View your order', ctaUrl: r.orderUrl, year: new Date().getFullYear() },
                `${c.headline}\n\n${c.intro}\n\n${c.body}\n\n${c.footnote}\n\nView your order: ${r.orderUrl}`,
                this.config.get<string>('SUPPORT_INBOX_EMAIL') || undefined,
            );
            await this.notificationService.logNotification({ userId: r.customerId, type: 'EMAIL', channel: `RETURN_${r.status}`, status: 'SENT', metadata: { rmaNumber: r.rmaNumber, email: r.email } }).catch(() => undefined);
        } catch (e) {
            await this.notificationService.logNotification({ userId: r.customerId, type: 'EMAIL', channel: `RETURN_${r.status}`, status: 'FAILED', metadata: { rmaNumber: r.rmaNumber, error: (e as Error).message } }).catch(() => undefined);
        }
    }

    @EventPattern('support.message.replied')
    async handleSupportReply(@Payload() m: {
        messageId: string; replyId: string; reference: string; customerId?: string | null; name: string; email: string;
        subject: string; originalBody: string; reply: string; authorName?: string | null; orderNumber?: string | null;
    }) {
        if (!m?.email || !m.reply) return;
        const first = (m.name || '').split(' ')[0] || 'there';
        // staff show as their first name ("jane.doe@…" → "Jane"), never their full email
        const local = (m.authorName || '').split('@')[0].split(/[._-]/)[0];
        const author = local ? local.charAt(0).toUpperCase() + local.slice(1) : 'Our team';
        const replyTo = this.config.get<string>('SUPPORT_INBOX_EMAIL') || this.config.get<string>('SMTP_FROM');
        const meta = { messageId: m.messageId, replyId: m.replyId, reference: m.reference, email: m.email };
        try {
            await this.emailService.sendSupportEmail(
                m.email,
                `Re: ${m.subject} [${m.reference}]`,
                {
                    headline: 'We\'ve replied to your message',
                    intro: `Hi ${first}, ${author} from the Genesis parts team replied:`,
                    reference: m.reference, subject: m.subject, body: m.reply, quoted: m.originalBody,
                    year: new Date().getFullYear(),
                    footnote: `Just reply to this email to continue the conversation — please keep ${m.reference} in the subject.`,
                },
                `${author} from Genesis replied to your message (${m.reference}):\n\n${m.reply}\n\n— Your original message —\n${m.originalBody}`,
                replyTo,
            );
            await this.notificationService.logNotification({ userId: m.customerId || m.email, type: 'EMAIL', channel: 'SUPPORT_REPLY', status: 'SENT', metadata: meta }).catch(() => undefined);
        } catch (e) {
            this.logger.error(`Support reply email to ${m.email} failed`, e as Error);
            await this.notificationService.logNotification({ userId: m.customerId || m.email, type: 'EMAIL', channel: 'SUPPORT_REPLY', status: 'FAILED', metadata: { ...meta, error: (e as Error).message } }).catch(() => undefined);
        }
    }

    @EventPattern('support.message.received')
    async handleSupportMessage(@Payload() m: {
        messageId: string; reference: string; customerId?: string | null; name: string; email: string; phone?: string | null;
        subject: string; body: string; priority: string; orderNumber?: string | null;
    }) {
        if (!m?.email) return;
        const year = new Date().getFullYear();
        const first = (m.name || '').split(' ')[0] || 'there';
        const log = (channel: string, status: string, extra: Record<string, unknown> = {}) =>
            this.notificationService.logNotification({
                userId: m.customerId || m.email, type: 'EMAIL', channel, status,
                metadata: { messageId: m.messageId, reference: m.reference, ...extra },
            }).catch(() => undefined);

        // 1. acknowledgement to the customer
        try {
            await this.emailService.sendSupportEmail(
                m.email,
                `We've received your message (${m.reference})`,
                {
                    headline: 'Thanks — we got your message',
                    intro: `Hi ${first}, thanks for contacting Genesis. A member of our parts team will reply by email or phone, usually within one business day (Monday–Saturday, 8am–6pm).`,
                    reference: m.reference, subject: m.subject, body: m.body, year,
                    footnote: `Please quote ${m.reference} if you contact us about this again. For anything urgent, call or WhatsApp 0720 123 456.`,
                },
                `Thanks — we got your message (${m.reference}).\n\nA member of our team will reply usually within one business day.\n\nYour message:\n${m.body}`,
            );
            await log('SUPPORT_ACK', 'SENT', { email: m.email });
        } catch (e) {
            this.logger.error(`Support acknowledgement to ${m.email} failed`, e as Error);
            await log('SUPPORT_ACK', 'FAILED', { email: m.email, error: (e as Error).message });
        }

        // 2. optional alert to the team inbox (set SUPPORT_INBOX_EMAIL)
        const inbox = this.config.get<string>('SUPPORT_INBOX_EMAIL');
        if (!inbox) return;
        const dashboard = (this.config.get<string>('DASHBOARD_URL') || 'http://localhost:3001').replace(/\/$/, '');
        try {
            await this.emailService.sendSupportEmail(
                inbox,
                `${m.priority === 'HIGH' || m.priority === 'URGENT' ? '[High] ' : ''}New message: ${m.subject} (${m.reference})`,
                {
                    headline: 'New customer message', staff: true, urgent: m.priority === 'HIGH' || m.priority === 'URGENT',
                    intro: 'A customer sent a message through the website contact form. Reply from the dashboard, or reply to this email to answer them directly.',
                    reference: m.reference, subject: m.subject, body: m.body, name: m.name, email: m.email, phone: m.phone, year,
                    cta: 'Open in dashboard', ctaUrl: `${dashboard}/messages`,
                    footnote: 'You get this because SUPPORT_INBOX_EMAIL is set on the notification service.',
                },
                `New message ${m.reference} from ${m.name} <${m.email}>${m.phone ? ` (${m.phone})` : ''}\n${m.subject}\n\n${m.body}`,
                m.email, // reply goes straight to the customer
            );
            await log('SUPPORT_ALERT', 'SENT');
        } catch (e) {
            await log('SUPPORT_ALERT', 'FAILED', { error: (e as Error).message });
        }
    }

    // ============================================
    // ORDER LIFECYCLE (emitted by the order service)
    // ============================================

    @EventPattern('order.placed')
    async handleOrderPlaced(@Payload() data: OrderEvent) {
        await this.sendOrderNotifications('order.placed', data);
    }

    @EventPattern('order.status.changed')
    async handleOrderStatusChanged(@Payload() data: OrderEvent) {
        await this.sendOrderNotifications('order.status.changed', data);
    }

    private async sendOrderNotifications(event: string, data: OrderEvent) {
        const kind = kindFor(event, data?.status);
        if (!kind || !data?.email) return;
        const msg = buildOrderMessage(kind, data);
        const meta = { orderId: data.orderId, orderNumber: data.orderNumber, kind };

        // email — up to 3 attempts with backoff (1s, 2s)
        let lastError: unknown = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await this.emailService.sendOrderEmail(data.email, msg);
                lastError = null;
                break;
            } catch (e) {
                lastError = e;
                if (attempt < 3) await new Promise((r) => setTimeout(r, 1000 * attempt));
            }
        }
        await this.notificationService.logNotification({
            userId: data.customerId,
            type: 'EMAIL',
            channel: `ORDER_${kind}`,
            status: lastError ? 'FAILED' : 'SENT',
            metadata: { ...meta, email: data.email, ...(lastError ? { error: (lastError as Error).message } : {}) },
        }).catch(() => undefined);
        if (lastError) this.logger.error(`Order ${kind} email for ${data.orderNumber} failed after 3 attempts`, lastError as Error);
        else this.logger.log(`Order ${kind} email sent for ${data.orderNumber}`);

        // SMS — only when Africa's Talking is configured and the customer gave a phone number
        const sms = await this.smsService.send(data.phone, msg.sms);
        if (sms.status !== 'SKIPPED') {
            await this.notificationService.logNotification({
                userId: data.customerId,
                type: 'SMS',
                channel: `ORDER_${kind}`,
                status: sms.status,
                metadata: { ...meta, ...(sms.detail ? { detail: sms.detail } : {}) },
            }).catch(() => undefined);
        }
    }

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

    // Admin-created-user invitation (verify-email link, not an OTP code)
    @EventPattern('auth.invite.send')
    async handleInviteSend(@Payload() data: any) {
        this.logger.log(`Processing invitation email for: ${data.email}`);
        try {
            await this.emailService.sendInviteEmail(data.email, data.firstName, data.inviteUrl, data.expiresInHours);
            await this.notificationService.logNotification({
                userId: data.userId,
                type: 'EMAIL',
                channel: 'INVITE',
                status: 'SENT',
                metadata: { email: data.email },
            });
            this.logger.log(`Invitation email sent to ${data.email}`);
        } catch (error) {
            this.logger.error(`Failed to send invitation email to ${data.email}:`, error);
            await this.notificationService.logNotification({
                userId: data.userId,
                type: 'EMAIL',
                channel: 'INVITE',
                status: 'FAILED',
                metadata: { email: data.email, error: error.message },
            });
            await this.notificationService.scheduleRetry({
                event: 'auth.invite.send',
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
