import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from "nodemailer";
import { Transporter } from "nodemailer";

@Injectable()
export class EmailService {
    private transporter: Transporter;
    private readonly logger = new Logger(EmailService.name);

    constructor(private configService: ConfigService) {
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

    async sendWelcomeEmail(to: string, firstName: string): Promise<void> {
        const html = `
            <h1>Welcome to Genesis!</h1>
            <p>Hi ${firstName},</p>
            <p>Thank you for registering with Genesis. We're excited to have you on board!</p>
            <p>You can now start exploring our catalog of vehicle spare parts.</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <br />
            <p>Best regards,</p>
            <p>The Genesis Team</p>
        `;

        await this.sendEmail({
            to,
            subject: 'Welcome to Genesis!',
            html,
            // Optional: plain text version
            text: `
                Welcome to Genesis!
                Hi ${firstName},
                Thank you for registering with Genesis. We're excited to have you on board!
                You can now start exploring our catalog of vehicle spare parts.
                If you have any questions, feel free to reach out to our support team.
                Best regards,
                The Genesis Team
            `,
        });
    }

    private async sendEmail(options: {
        to: string;
        subject: string;
        html: string;
        text?: string;
    }): Promise<void> {
        try {
            const info = await this.transporter.sendMail({
                from: `"Genesis" <${this.configService.get('SMTP_FROM', 'noreply@genesis.com')}>`,
                to: options.to,
                subject: options.subject,
                html: options.html,
                text: options.text,
            })
            this.logger.log(`Email sent to ${options.to}: ${info.messageId}`);
        } catch (error) {
            this.logger.error(`Failed to send email to ${options.to}:`, error);
            throw error;
        }
    }
}