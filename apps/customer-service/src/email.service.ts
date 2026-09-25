import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom, timeout } from 'rxjs';
import sanitizeHtml from 'sanitize-html';
import { PrismaService } from '../libs/prisma/prisma.service';
import { Prisma } from './generated/prisma';
import { EmailRecipientInputDto, SaveEmailDto } from './dto/email.dto';
import { CustomerService } from './customer.service';

type Actor = { userId?: string; email?: string };

const SEND_TIMEOUT_MS = 60_000;

/** Tags, attributes and inline styles a rich-text email may keep; everything else is stripped. */
const SANITIZE: sanitizeHtml.IOptions = {
    allowedTags: [
        'p', 'br', 'div', 'span', 'strong', 'b', 'em', 'i', 'u', 's', 'del', 'strike', 'mark', 'sub', 'sup',
        'h1', 'h2', 'h3', 'h4', 'blockquote', 'pre', 'code', 'ul', 'ol', 'li', 'a', 'img', 'hr',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
    ],
    allowedAttributes: {
        a: ['href', 'title', 'target', 'rel'],
        img: ['src', 'alt', 'title', 'width', 'height'],
        td: ['colspan', 'rowspan'],
        th: ['colspan', 'rowspan'],
        '*': ['style'],
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['https'] },
    allowedStyles: {
        '*': {
            color: [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i],
            'background-color': [/^#[0-9a-f]{3,8}$/i, /^rgba?\([\d\s.,%]+\)$/i],
            'text-align': [/^(left|right|center|justify)$/],
            'font-size': [/^\d{1,3}(\.\d+)?(px|pt|em|rem|%)$/],
            'font-family': [/^[\w\s,'"-]{1,120}$/],
            'font-weight': [/^(normal|bold|[1-9]00)$/],
            'font-style': [/^(normal|italic)$/],
            'text-decoration': [/^[a-z\s-]{1,40}$/],
            'line-height': [/^[\d.]+(px|em|rem|%)?$/],
            width: [/^\d{1,4}(px|%)$/, /^auto$/],
            'max-width': [/^\d{1,4}(px|%)$/],
            height: [/^\d{1,4}px$/, /^auto$/],
        },
    },
    transformTags: {
        a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noopener noreferrer' }),
    },
    // an image whose source was stripped (e.g. data: URLs) would render as a broken box
    exclusiveFilter: (frame) => frame.tag === 'img' && !frame.attribs.src,
};

const MERGE_FIELD = /\{\{\s*(firstName|lastName|fullName|email)\s*\}\}/g;

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Plain-text alternative for mail clients that don't render HTML. */
export function htmlToText(html: string): string {
    return html
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<\/(p|div|h[1-6]|li|blockquote|tr)>/gi, '\n')
        .replace(/<li[^>]*>/gi, '• ')
        .replace(/<a [^>]*href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '$2 ($1)')
        .replace(/<[^>]+>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

@Injectable()
export class EmailService implements OnModuleInit {
    private readonly logger = new Logger(EmailService.name);

    constructor(
        private readonly prisma: PrismaService,
        private readonly customers: CustomerService,
        @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
    ) { }

    /** Finish sends interrupted by a restart. */
    async onModuleInit() {
        const stuck = await this.prisma.emailMessage.findMany({ where: { status: 'SENDING' }, select: { id: true } }).catch(() => []);
        for (const m of stuck) void this.deliver(m.id);
    }

    private fail(statusCode: number, message: string): never {
        throw new RpcException({ statusCode, message, error: statusCode === 404 ? 'Not Found' : 'Bad Request' });
    }

    // ── folders ───────────────────────────────────────────

    async list(q: { folder?: string; search?: string; page?: number; limit?: number }) {
        const page = Math.max(1, Number(q.page) || 1);
        const limit = Math.min(100, Math.max(1, Number(q.limit) || 25));
        const where: Prisma.EmailMessageWhereInput = q.folder === 'drafts' ? { status: 'DRAFT' } : { status: { not: 'DRAFT' } };
        const s = q.search?.trim();
        if (s) {
            where.OR = [
                { subject: { contains: s, mode: 'insensitive' } },
                { recipients: { some: { OR: [{ email: { contains: s, mode: 'insensitive' } }, { name: { contains: s, mode: 'insensitive' } }] } } },
            ];
        }
        const [rows, total, drafts] = await Promise.all([
            this.prisma.emailMessage.findMany({
                where,
                orderBy: q.folder === 'drafts' ? { updatedAt: 'desc' } : { sentAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                include: { recipients: { select: { email: true, name: true, status: true }, orderBy: { createdAt: 'asc' } } },
            }),
            this.prisma.emailMessage.count({ where }),
            this.prisma.emailMessage.count({ where: { status: 'DRAFT' } }),
        ]);
        return {
            data: rows.map(({ recipients, html, ...m }) => ({
                ...m,
                snippet: htmlToText(html).replace(/\s+/g, ' ').slice(0, 160),
                recipientCount: recipients.length,
                recipientPreview: recipients.slice(0, 3).map((r) => r.name || r.email),
                counts: {
                    sent: recipients.filter((r) => r.status === 'SENT').length,
                    failed: recipients.filter((r) => r.status === 'FAILED').length,
                    skipped: recipients.filter((r) => r.status === 'SKIPPED').length,
                    pending: recipients.filter((r) => r.status === 'PENDING').length,
                },
            })),
            meta: { total, page, limit, totalPages: Math.ceil(total / limit), drafts },
        };
    }

    async get(id: string) {
        const m = await this.prisma.emailMessage.findUnique({
            where: { id },
            include: {
                recipients: {
                    orderBy: { createdAt: 'asc' },
                    include: { customer: { select: { firstName: true, lastName: true, preferences: { select: { marketingEmails: true } } } } },
                },
            },
        });
        if (!m) this.fail(404, 'Email not found');
        return {
            ...m,
            recipients: m.recipients.map(({ customer, ...r }) => ({
                ...r,
                // opted out of marketing email — shown as a warning in the composer
                marketingOptOut: customer?.preferences?.marketingEmails === false,
            })),
        };
    }

    /** Emails a customer received, newest first (customer profile). */
    async forCustomer(customerId: string) {
        const rows = await this.prisma.emailRecipient.findMany({
            where: { customerId, message: { status: { not: 'DRAFT' } } },
            orderBy: { createdAt: 'desc' },
            take: 50,
            include: { message: { select: { id: true, subject: true, sentAt: true, createdByEmail: true } } },
        });
        return rows.map((r) => ({ id: r.id, status: r.status, error: r.error, sentAt: r.sentAt, email: r.email, message: r.message }));
    }

    // ── drafts ────────────────────────────────────────────

    async create(dto: SaveEmailDto, actor: Actor) {
        const recipients = await this.resolveRecipients(dto.recipients ?? []);
        const m = await this.prisma.emailMessage.create({
            data: {
                ...this.fields(dto),
                createdById: actor.userId,
                createdByEmail: actor.email,
                recipients: { create: recipients },
            },
        });
        return this.get(m.id);
    }

    async update(id: string, dto: SaveEmailDto) {
        const existing = await this.prisma.emailMessage.findUnique({ where: { id } });
        if (!existing) this.fail(404, 'Email not found');
        if (existing.status !== 'DRAFT') this.fail(400, 'This email has already been sent');
        const recipients = dto.recipients ? await this.resolveRecipients(dto.recipients) : null;
        await this.prisma.$transaction([
            this.prisma.emailMessage.update({ where: { id }, data: this.fields(dto) }),
            ...(recipients
                ? [
                    this.prisma.emailRecipient.deleteMany({ where: { emailMessageId: id } }),
                    this.prisma.emailRecipient.createMany({ data: recipients.map((r) => ({ ...r, emailMessageId: id })) }),
                ]
                : []),
        ]);
        return this.get(id);
    }

    async remove(id: string) {
        const existing = await this.prisma.emailMessage.findUnique({ where: { id } });
        if (!existing) this.fail(404, 'Email not found');
        if (existing.status !== 'DRAFT') this.fail(400, 'Sent emails are kept for the record and can\'t be deleted');
        await this.prisma.emailMessage.delete({ where: { id } });
        return { success: true };
    }

    /** A new draft with the same content and recipients ("use again"). */
    async duplicate(id: string, actor: Actor) {
        const m = await this.get(id);
        return this.create({
            subject: m.subject,
            html: m.html,
            cc: m.cc,
            bcc: m.bcc,
            attachments: (m.attachments as unknown as SaveEmailDto['attachments']) ?? [],
            branded: m.branded,
            marketing: m.marketing,
            recipients: m.recipients.map((r) => ({ customerId: r.customerId ?? undefined, email: r.email, name: r.name ?? undefined })),
        }, actor);
    }

    private fields(dto: SaveEmailDto): Prisma.EmailMessageUpdateInput & Prisma.EmailMessageCreateInput {
        return {
            ...(dto.subject !== undefined ? { subject: dto.subject.trim() } : {}),
            ...(dto.html !== undefined ? { html: sanitizeHtml(dto.html, SANITIZE) } : {}),
            ...(dto.cc ? { cc: this.dedupeEmails(dto.cc) } : {}),
            ...(dto.bcc ? { bcc: this.dedupeEmails(dto.bcc) } : {}),
            ...(dto.attachments ? { attachments: dto.attachments as unknown as Prisma.InputJsonValue } : {}),
            ...(dto.branded !== undefined ? { branded: dto.branded } : {}),
            ...(dto.marketing !== undefined ? { marketing: dto.marketing } : {}),
        } as Prisma.EmailMessageUpdateInput & Prisma.EmailMessageCreateInput;
    }

    private dedupeEmails(list: string[]) {
        return [...new Set(list.map((e) => e.trim().toLowerCase()).filter(Boolean))];
    }

    /** One row per address; links typed addresses to the customer who owns them. */
    private async resolveRecipients(input: EmailRecipientInputDto[]) {
        const byEmail = new Map<string, EmailRecipientInputDto>();
        for (const r of input) {
            const email = r.email.trim().toLowerCase();
            if (!byEmail.has(email)) byEmail.set(email, { ...r, email });
        }
        const emails = [...byEmail.keys()];
        const ids = [...byEmail.values()].map((r) => r.customerId).filter((x): x is string => !!x);
        const known = emails.length
            ? await this.prisma.customer.findMany({
                where: { OR: [{ email: { in: emails, mode: 'insensitive' } }, ...(ids.length ? [{ id: { in: ids } }] : [])] },
                select: { id: true, email: true, firstName: true, lastName: true },
            })
            : [];
        const byId = new Map(known.map((c) => [c.id, c]));
        const byMail = new Map(known.map((c) => [c.email.toLowerCase(), c]));
        return [...byEmail.values()].map((r) => {
            const c = (r.customerId && byId.get(r.customerId)) || byMail.get(r.email);
            return {
                email: r.email,
                customerId: c?.id ?? null,
                name: r.name?.trim() || (c ? `${c.firstName} ${c.lastName}`.trim() : null),
            };
        });
    }

    // ── sending ───────────────────────────────────────────

    /** Validate and start delivering; returns straight away while emails go out in the background. */
    async send(id: string) {
        const m = await this.prisma.emailMessage.findUnique({ where: { id }, include: { _count: { select: { recipients: true } } } });
        if (!m) this.fail(404, 'Email not found');
        if (m.status !== 'DRAFT') this.fail(400, 'This email has already been sent');
        this.assertSendable(m.subject, m.html);
        if (m._count.recipients === 0) this.fail(400, 'Add at least one recipient.');

        await this.prisma.$transaction([
            this.prisma.emailRecipient.updateMany({ where: { emailMessageId: id }, data: { status: 'PENDING', error: null } }),
            this.prisma.emailMessage.update({ where: { id }, data: { status: 'SENDING', sentAt: new Date() } }),
        ]);
        void this.deliver(id);
        return this.get(id);
    }

    private assertSendable(subject: string, html: string) {
        if (!subject.trim()) this.fail(400, 'Add a subject.');
        if (!htmlToText(html).trim() && !/<img\s/i.test(html)) this.fail(400, 'Write a message before sending.');
    }

    /** Send each pending recipient their own copy, recording the outcome as we go. */
    private async deliver(id: string) {
        try {
            const m = await this.prisma.emailMessage.findUnique({ where: { id } });
            if (!m) return;
            const pending = await this.prisma.emailRecipient.findMany({
                where: { emailMessageId: id, status: 'PENDING' },
                orderBy: { createdAt: 'asc' },
                include: { customer: { select: { id: true, firstName: true, lastName: true, preferences: { select: { marketingEmails: true } } } } },
            });

            for (const r of pending) {
                if (m.marketing && r.customer?.preferences?.marketingEmails === false) {
                    await this.prisma.emailRecipient.update({ where: { id: r.id }, data: { status: 'SKIPPED', error: 'Opted out of marketing emails' } });
                    continue;
                }
                try {
                    await this.dispatch(m, r.email, this.mergeValues(r.email, r.name, r.customer));
                    await this.prisma.emailRecipient.update({ where: { id: r.id }, data: { status: 'SENT', sentAt: new Date(), error: null } });
                    if (r.customerId) {
                        await this.customers.logActivity({
                            customerId: r.customerId, action: 'EMAIL_SENT', resource: 'EMAIL', resourceId: id,
                            metadata: { subject: m.subject, by: m.createdByEmail },
                        }).catch(() => undefined);
                    }
                } catch (e) {
                    const error = (e as { message?: string })?.message || 'Could not send';
                    this.logger.warn(`Email ${id} to ${r.email} failed: ${error}`);
                    await this.prisma.emailRecipient.update({ where: { id: r.id }, data: { status: 'FAILED', error: error.slice(0, 500) } });
                }
            }

            const all = await this.prisma.emailRecipient.groupBy({ by: ['status'], where: { emailMessageId: id }, _count: { _all: true } });
            const n = (s: string) => all.find((g) => g.status === s)?._count._all ?? 0;
            const status = n('SENT') === 0 ? 'FAILED' : n('FAILED') > 0 ? 'PARTIAL' : 'SENT';
            await this.prisma.emailMessage.update({ where: { id }, data: { status } });
            this.logger.log(`Email ${id} "${m.subject}": ${n('SENT')} sent, ${n('FAILED')} failed, ${n('SKIPPED')} skipped`);
        } catch (e) {
            this.logger.error(`Delivering email ${id} stopped`, e as Error);
        }
    }

    /** Send the current draft (or unsaved content) to the signed-in staff member only. */
    async sendTest(dto: SaveEmailDto, to: string) {
        const subject = dto.subject?.trim() ?? '';
        const html = sanitizeHtml(dto.html ?? '', SANITIZE);
        this.assertSendable(subject, html);
        const first = (await this.resolveRecipients(dto.recipients?.slice(0, 1) ?? []))[0];
        const customer = first?.customerId
            ? await this.prisma.customer.findUnique({ where: { id: first.customerId }, select: { firstName: true, lastName: true } })
            : null;
        const values = first ? this.mergeValues(first.email, first.name, customer) : this.mergeValues(to, null, null);
        try {
            await this.dispatch(
                { subject: `[Test] ${subject}`, html, cc: [], bcc: [], attachments: (dto.attachments ?? null) as Prisma.JsonValue, branded: dto.branded ?? true },
                to,
                values,
            );
        } catch (e) {
            throw new RpcException({ statusCode: 502, message: `Test email failed: ${(e as Error)?.message || 'mail server error'}`, error: 'Bad Gateway' });
        }
        return { success: true, to };
    }

    private mergeValues(email: string, name: string | null, customer: { firstName: string; lastName: string } | null) {
        const [nFirst, ...nRest] = (name ?? '').trim().split(/\s+/).filter(Boolean);
        const firstName = customer?.firstName || nFirst || 'there';
        const lastName = customer?.lastName || nRest.join(' ');
        const fullName = customer ? `${customer.firstName} ${customer.lastName}`.trim() : (name?.trim() || email);
        return { firstName, lastName, fullName, email };
    }

    private personalise(text: string, values: Record<string, string>, html: boolean) {
        return text.replace(MERGE_FIELD, (_, key: string) => (html ? escapeHtml(values[key] ?? '') : values[key] ?? ''));
    }

    private dispatch(
        m: { subject: string; html: string; cc: string[]; bcc: string[]; attachments: Prisma.JsonValue; branded: boolean },
        to: string,
        values: Record<string, string>,
    ) {
        const html = this.personalise(m.html, values, true);
        return firstValueFrom(
            this.notificationClient
                .send('email.custom.send', {
                    to,
                    cc: m.cc,
                    bcc: m.bcc,
                    subject: this.personalise(m.subject, values, false),
                    html,
                    text: htmlToText(html),
                    branded: m.branded,
                    attachments: ((m.attachments as { name: string; url: string }[] | null) ?? []).map((a) => ({ filename: a.name, url: a.url })),
                })
                .pipe(timeout(SEND_TIMEOUT_MS)),
        );
    }
}
