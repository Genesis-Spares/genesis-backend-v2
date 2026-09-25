import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type SmsResult = { status: 'SENT' | 'SKIPPED' | 'FAILED'; detail?: string };

/**
 * SMS via Africa's Talking (https://africastalking.com), called over its REST
 * API so no SDK is needed. Disabled until AT_USERNAME and AT_API_KEY are set,
 * in which case sends are logged as SKIPPED and nothing else changes.
 *
 * Env:
 *   AT_USERNAME   "sandbox" for testing, your app username in production
 *   AT_API_KEY    API key from the Africa's Talking dashboard
 *   AT_SENDER_ID  optional approved sender name / shortcode (e.g. GENESIS)
 */
@Injectable()
export class SmsService {
    private readonly logger = new Logger(SmsService.name);

    constructor(private readonly config: ConfigService) { }

    get enabled() {
        return Boolean(this.config.get('AT_USERNAME') && this.config.get('AT_API_KEY'));
    }

    /** "0712 345 678" / "254712345678" → "+254712345678"; null if not a usable number. */
    static normalize(raw?: string | null): string | null {
        if (!raw) return null;
        let d = raw.replace(/[\s\-()]/g, '');
        if (/^0[17]\d{8}$/.test(d)) d = '+254' + d.slice(1);
        else if (/^254\d{9}$/.test(d)) d = '+' + d;
        return /^\+\d{10,15}$/.test(d) ? d : null;
    }

    async send(to: string | null | undefined, message: string): Promise<SmsResult> {
        const phone = SmsService.normalize(to);
        if (!this.enabled) return { status: 'SKIPPED', detail: 'SMS not configured' };
        if (!phone) return { status: 'SKIPPED', detail: 'No valid phone number' };

        const username = this.config.get<string>('AT_USERNAME')!;
        const host = username === 'sandbox' ? 'https://api.sandbox.africastalking.com' : 'https://api.africastalking.com';
        const body = new URLSearchParams({ username, to: phone, message });
        const from = this.config.get<string>('AT_SENDER_ID');
        if (from) body.set('from', from);

        try {
            const res = await fetch(`${host}/version1/messaging`, {
                method: 'POST',
                headers: {
                    apiKey: this.config.get<string>('AT_API_KEY')!,
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body,
                signal: AbortSignal.timeout(10_000),
            });
            const json = (await res.json().catch(() => null)) as
                | { SMSMessageData?: { Recipients?: { status?: string; statusCode?: number }[]; Message?: string } }
                | null;
            const r = json?.SMSMessageData?.Recipients?.[0];
            // 100 Processed, 101 Sent, 102 Queued
            if (res.ok && r && [100, 101, 102].includes(Number(r.statusCode))) return { status: 'SENT' };
            return { status: 'FAILED', detail: r?.status || json?.SMSMessageData?.Message || `HTTP ${res.status}` };
        } catch (e) {
            this.logger.error(`SMS to ${phone} failed`, e as Error);
            return { status: 'FAILED', detail: (e as Error).message };
        }
    }
}
