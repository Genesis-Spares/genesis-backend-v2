import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";
import { EmailTemplateService } from "../templates/email-template.service";

@Injectable()
export class EmailService {
    private transporter: Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor(
        private configService: ConfigService,
        private readonly templateService: EmailTemplateService,
    ) {
        this.transporter = nodemailer.createTransport({
            host: this.configService.get('SMTP_HOST'),
            port: Number(this.configService.get("SMTP_PORT", 465)),
            secure: this.configService.get<string>('SMTP_SECURE') === 'true',
            auth: {
                user: this.configService.get('SMTP_USER'),
                pass: this.configService.get('SMTP_PASSWORD')
            },
        })
    }

    async sendWelcomeEmail(
        to: string,
        firstName: string,
    ): Promise<void> {
        const html = await this.templateService.render(
            'welcome',
            {
                firstName,
            },
        );

        await this.sendEmail({
            to,
            subject: 'Welcome to Genesis!',
            html,
            text: `Welcome to Genesis, ${firstName}!`,
        });
    }



    async sendPasswordResetEmail(
        to: string,
        firstName: string,
        resetUrl: string,
    ): Promise<void> {
        const html = await this.templateService.render(
            'password-reset',
            {
                firstName,
                resetUrl,
            },
        );

        await this.sendEmail({
            to,
            subject: 'Reset Your Password - Genesis',
            html,
            text: `Hi ${firstName}, reset your password here: ${resetUrl}`,
        });
    }

    async sendInviteEmail(
        to: string,
        firstName: string,
        inviteUrl: string,
        expiresInHours: number,
    ): Promise<void> {
        const html = await this.templateService.render(
            'invite',
            {
                firstName,
                inviteUrl,
                expiresInHours: expiresInHours.toString(),
            },
        );

        await this.sendEmail({
            to,
            subject: "You've been invited to Genesis",
            html,
            text: `Hi ${firstName}, you've been invited to Genesis. Verify your email here: ${inviteUrl} (expires in ${expiresInHours} hours)`,
        });
    }

    async sendOTPEmail(
        to: string,
        firstName: string,
        otp: string,
        type: string,
        expiresInMinutes: number,
    ): Promise<void> {
        // Get the action based on type
        const actionMap: Record<string, string> = {
            REGISTER: 'verify your email address',
            LOGIN: 'log in to your account',
            FORGOT_PASSWORD: 'reset your password',
            CHANGE_EMAIL: 'change your email address',
        };
        const action = actionMap[type] || 'verify your account';

        const html = await this.templateService.render(
            'otp',
            {
                firstName,
                otp,
                action,
                expiresInMinutes: expiresInMinutes.toString(),
            },
        );

        const subjectMap: Record<string, string> = {
            REGISTER: 'Verify Your Email - Genesis',
            LOGIN: 'Your Login OTP - Genesis',
            FORGOT_PASSWORD: 'Password Reset OTP - Genesis',
            CHANGE_EMAIL: 'Email Change OTP - Genesis',
        };
        const subject = subjectMap[type] || 'Your OTP Code - Genesis';

        await this.sendEmail({
            to,
            subject,
            html,
            text: `
                Hi ${firstName},
                
                Your OTP code is: ${otp}
                
                This code will expire in ${expiresInMinutes} minutes.
                
                Use this code to ${action}.
                
                If you didn't request this, please ignore this email.
                
                Best regards,
                The Genesis Team
            `,
        });
    }


    /** Contact-form emails: acknowledgement to the customer, or alert to the support inbox. */
    async sendSupportEmail(to: string, subject: string, view: Record<string, unknown>, text: string, replyTo?: string): Promise<void> {
        const html = await this.templateService.render('support', view);
        await this.sendEmail({ to, subject, html, text, replyTo });
    }

    /** Order lifecycle email — content comes from buildOrderMessage(). */
    async sendOrderEmail(to: string, msg: { subject: string; text: string; view: Record<string, unknown> }): Promise<void> {
        const html = await this.templateService.render('order', msg.view);
        await this.sendEmail({ to, subject: msg.subject, html, text: msg.text });
    }

    private async sendEmail(options: {
        to: string;
        subject: string;
        html: string;
        text?: string;
        replyTo?: string;
    }): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
                from: `"Genesis" <${this.configService.get('SMTP_FROM', 'noreply@genesis.com')}>`,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
                replyTo: options.replyTo,
            })
            this.logger.log(`Email sent to ${options.to}: ${info.messageId}`);
        } catch (error) {
            this.logger.error(`Failed to send email to ${options.to}:`, error);
            throw error;
        }
    }
}