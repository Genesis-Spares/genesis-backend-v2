import { randomUUID } from 'crypto';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type MpesaMode = 'sandbox' | 'production' | 'mock' | 'disabled';

export class MpesaError extends Error { }

export interface StkCallbackBody {
    Body?: {
        stkCallback?: {
            MerchantRequestID?: string;
            CheckoutRequestID?: string;
            ResultCode?: number | string;
            ResultDesc?: string;
            CallbackMetadata?: { Item?: { Name: string; Value?: string | number }[] };
        };
    };
}

export type QueryResult =
    | { state: 'PENDING'; raw: unknown }
    | { state: 'SUCCESS' | 'FAILED'; resultCode: number; resultDesc: string; raw: unknown };

const BASE_URL = { sandbox: 'https://sandbox.safaricom.co.ke', production: 'https://api.safaricom.co.ke' };

/** Daraja rejects a new query while the customer is still looking at the PIN prompt. */
const STILL_PROCESSING = '500.001.1001';

/**
 * Thin Safaricom Daraja client for Lipa na M-Pesa Online (STK push).
 * Mock mode (local dev without credentials) fakes the phone prompt and
 * answers through `onMockCallback` a few seconds later.
 */
@Injectable()
export class MpesaClient {
    private readonly logger = new Logger(MpesaClient.name);
    readonly mode: MpesaMode;
    private token?: { value: string; expiresAt: number };
    private readonly mockResults = new Map<string, QueryResult>();
    onMockCallback?: (body: StkCallbackBody) => Promise<unknown>;

    constructor(private readonly config: ConfigService) {
        const env = (config.get<string>('MPESA_ENV') || '').toLowerCase();
        const hasCredentials = Boolean(config.get('MPESA_CONSUMER_KEY') && config.get('MPESA_CONSUMER_SECRET'));
        const isProd = config.get('NODE_ENV') === 'production';
        if (env === 'mock') this.mode = isProd ? 'disabled' : 'mock';
        else if (env === 'sandbox' || env === 'production') this.mode = hasCredentials ? env : 'disabled';
        else this.mode = hasCredentials ? 'sandbox' : isProd ? 'disabled' : 'mock';

        if (this.mode === 'mock') this.logger.warn('M-Pesa is in MOCK mode — payments are simulated. Set MPESA_* credentials for real payments.');
        if (this.mode === 'disabled') this.logger.error('M-Pesa is NOT configured (set MPESA_ENV, MPESA_CONSUMER_KEY/SECRET, MPESA_SHORTCODE, MPESA_PASSKEY, MPESA_CALLBACK_URL). M-Pesa checkout will fail.');
    }

    private get shortcode() {
        return this.config.get<string>('MPESA_SHORTCODE') ?? '';
    }

    private password(timestamp: string) {
        return Buffer.from(`${this.shortcode}${this.config.get<string>('MPESA_PASSKEY') ?? ''}${timestamp}`).toString('base64');
    }

    /** yyyyMMddHHmmss in Kenyan time (UTC+3, no DST), as Daraja expects. */
    private timestamp() {
        return new Date(Date.now() + 3 * 3600_000).toISOString().replace(/[-T:]/g, '').slice(0, 14);
    }

    private callbackUrl() {
        const base = (this.config.get<string>('MPESA_CALLBACK_URL') || '').replace(/\/$/, '');
        const secret = this.config.get<string>('MPESA_CALLBACK_SECRET') || '';
        if (!base || !secret) throw new MpesaError('M-Pesa callback URL is not configured');
        return `${base}/${encodeURIComponent(secret)}`;
    }

    private async accessToken(): Promise<string> {
        if (this.token && this.token.expiresAt > Date.now()) return this.token.value;
        const key = this.config.get<string>('MPESA_CONSUMER_KEY')!;
        const secret = this.config.get<string>('MPESA_CONSUMER_SECRET')!;
        const res = await fetch(`${BASE_URL[this.mode as 'sandbox']}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${Buffer.from(`${key}:${secret}`).toString('base64')}` },
            signal: AbortSignal.timeout(15_000),
        });
        if (!res.ok) throw new MpesaError(`M-Pesa authentication failed (HTTP ${res.status})`);
        const body = (await res.json()) as { access_token: string; expires_in: string | number };
        this.token = { value: body.access_token, expiresAt: Date.now() + (Number(body.expires_in) - 60) * 1000 };
        return this.token.value;
    }

    private async post<T>(path: string, payload: unknown): Promise<{ ok: boolean; status: number; body: T }> {
        const res = await fetch(`${BASE_URL[this.mode as 'sandbox']}${path}`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${await this.accessToken()}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(20_000),
        });
        const body = (await res.json().catch(() => ({}))) as T;
        return { ok: res.ok, status: res.status, body };
    }

    /** Send the "enter your M-Pesa PIN" prompt to the customer's phone. */
    async stkPush(p: { amount: number; phone: string; accountReference: string; description: string }) {
        if (this.mode === 'disabled') throw new MpesaError('M-Pesa payments are not available right now');
        if (this.mode === 'mock') return this.mockPush(p.phone, p.amount);

        const timestamp = this.timestamp();
        const transactionType = this.config.get<string>('MPESA_TRANSACTION_TYPE') || 'CustomerPayBillOnline';
        const { ok, status, body } = await this.post<{
            ResponseCode?: string; ResponseDescription?: string; CustomerMessage?: string;
            MerchantRequestID?: string; CheckoutRequestID?: string; errorMessage?: string;
        }>('/mpesa/stkpush/v1/processrequest', {
            BusinessShortCode: this.shortcode,
            Password: this.password(timestamp),
            Timestamp: timestamp,
            TransactionType: transactionType,
            Amount: p.amount,
            PartyA: p.phone,
            PartyB: this.config.get<string>('MPESA_PARTY_B') || this.shortcode,
            PhoneNumber: p.phone,
            CallBackURL: this.callbackUrl(),
            AccountReference: p.accountReference.slice(0, 12),
            TransactionDesc: p.description.slice(0, 13),
        });
        if (!ok || body.ResponseCode !== '0' || !body.CheckoutRequestID) {
            this.logger.warn(`STK push rejected (HTTP ${status}): ${JSON.stringify(body)}`);
            throw new MpesaError(body.errorMessage || body.ResponseDescription || 'M-Pesa could not send the payment prompt');
        }
        return {
            merchantRequestId: body.MerchantRequestID ?? null,
            checkoutRequestId: body.CheckoutRequestID,
            customerMessage: body.CustomerMessage || 'Check your phone and enter your M-Pesa PIN',
        };
    }

    /** Ask Daraja how an STK push ended — used when its callback never arrives. */
    async stkQuery(checkoutRequestId: string): Promise<QueryResult> {
        if (this.mode === 'mock') return this.mockResults.get(checkoutRequestId) ?? { state: 'PENDING', raw: null };
        if (this.mode === 'disabled') return { state: 'PENDING', raw: null };

        const timestamp = this.timestamp();
        const { body } = await this.post<{ ResultCode?: string | number; ResultDesc?: string; errorCode?: string }>(
            '/mpesa/stkpushquery/v1/query',
            { BusinessShortCode: this.shortcode, Password: this.password(timestamp), Timestamp: timestamp, CheckoutRequestID: checkoutRequestId },
        );
        if (body.ResultCode === undefined || body.ResultCode === null || body.errorCode === STILL_PROCESSING) {
            return { state: 'PENDING', raw: body };
        }
        const resultCode = Number(body.ResultCode);
        return { state: resultCode === 0 ? 'SUCCESS' : 'FAILED', resultCode, resultDesc: body.ResultDesc ?? '', raw: body };
    }

    /** Mock: phones ending in 0000 decline (as if the customer cancelled); everything else pays after a short delay. */
    private mockPush(phone: string, amount: number) {
        const checkoutRequestId = `ws_CO_MOCK_${randomUUID()}`;
        const merchantRequestId = `MOCK-${randomUUID().slice(0, 8)}`;
        const declines = phone.endsWith('0000');
        const delay = Number(this.config.get('MPESA_MOCK_DELAY_MS', 4000));
        setTimeout(() => {
            const receipt = `MOCK${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
            const stkCallback = declines
                ? { MerchantRequestID: merchantRequestId, CheckoutRequestID: checkoutRequestId, ResultCode: 1032, ResultDesc: 'Request cancelled by user' }
                : {
                    MerchantRequestID: merchantRequestId,
                    CheckoutRequestID: checkoutRequestId,
                    ResultCode: 0,
                    ResultDesc: 'The service request is processed successfully.',
                    CallbackMetadata: {
                        Item: [
                            { Name: 'Amount', Value: amount },
                            { Name: 'MpesaReceiptNumber', Value: receipt },
                            { Name: 'PhoneNumber', Value: Number(phone) },
                        ],
                    },
                };
            this.mockResults.set(checkoutRequestId, {
                state: declines ? 'FAILED' : 'SUCCESS',
                resultCode: stkCallback.ResultCode,
                resultDesc: stkCallback.ResultDesc,
                raw: stkCallback,
            });
            this.onMockCallback?.({ Body: { stkCallback } }).catch((e) => this.logger.error('Mock M-Pesa callback failed', e as Error));
        }, delay);
        return Promise.resolve({ merchantRequestId, checkoutRequestId, customerMessage: 'Check your phone and enter your M-Pesa PIN (simulated)' });
    }
}
