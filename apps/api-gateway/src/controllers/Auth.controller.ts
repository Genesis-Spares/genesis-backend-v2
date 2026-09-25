// apps/api-gateway/src/auth.controller.ts
import { Body, Controller, HttpException, HttpStatus, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import {
    RegisterDto,
    LoginDto,
    RefreshDto,
    VerifyOTPDto,
    ResendOTPDto,
    ForgotPasswordDto,
    ResetPasswordDto,
    VerifyInviteDto,
} from '../dto/Auth.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.forward('auth.register', dto);
    }

    // Public — the link in the invitation email has no JWT to send.
    @Post('verify-invite')
    verifyInvite(@Body() dto: VerifyInviteDto, @Req() req: any) {
        return this.forward('auth.invite.verify', {
            token: dto.token,
            ipAddress: req.ip,
            userAgent: req.headers?.['user-agent'],
        });
    }

    @Post('verify-email')
    verifyEmail(@Body() dto: VerifyOTPDto) {
        return this.forward('auth.verify.email', dto);
    }

    @Post('resend-otp')
    resendOTP(@Body() dto: ResendOTPDto) {
        return this.forward('auth.resend.otp', dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto, @Req() req: any) {
        return this.forward('auth.login', {
            ...dto,
            ipAddress: req.ip,
            userAgent: req.headers?.['user-agent'],
        });
    }

    @Post('refresh')
    refresh(@Body() dto: RefreshDto) {
        return this.forward('auth.refresh', dto);
    }

    // ✅ Forgot Password - Request OTP
    @Post('forgot-password')
    forgotPassword(@Body() dto: ForgotPasswordDto) {
        return this.forward('auth.password.reset.request', dto);
    }

    // ✅ Reset Password with OTP
    @Post('reset-password')
    resetPassword(@Body() dto: ResetPasswordDto) {
        return this.forward('auth.password.reset', dto);
    }



    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.authClient.send(pattern, payload).pipe(
                catchError((error) => {
                    console.error(`Error in pattern ${pattern}:`, error);

                    // ✅ Extract and normalize error
                    const { status, message, error: errorType } = this.normalizeError(error);

                    throw new HttpException(
                        {
                            statusCode: status,
                            message: message,
                            error: errorType || HttpStatus[status] || 'Unknown Error',
                            timestamp: new Date().toISOString(),
                            path: pattern,
                        },
                        status
                    );
                }),
            ),
        );
    }

    private normalizeError(error: any): { status: number; message: string; error?: string } {
        // Default values
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Auth service error';
        let errorType = 'Internal Server Error';

        if (!error) {
            return { status, message, error: errorType };
        }

        // ✅ Check if it's an RpcException with proper structure
        if (error.statusCode) {
            if (typeof error.statusCode === 'number') {
                status = error.statusCode;
            } else if (typeof error.statusCode === 'string') {
                // Map string status codes
                const statusMap: Record<string, number> = {
                    'BAD_REQUEST': HttpStatus.BAD_REQUEST,
                    'UNAUTHORIZED': HttpStatus.UNAUTHORIZED,
                    'FORBIDDEN': HttpStatus.FORBIDDEN,
                    'NOT_FOUND': HttpStatus.NOT_FOUND,
                    'CONFLICT': HttpStatus.CONFLICT,
                    'INTERNAL_SERVER_ERROR': HttpStatus.INTERNAL_SERVER_ERROR,
                };
                status = statusMap[error.statusCode.toUpperCase()] || HttpStatus.BAD_REQUEST;
            }
        }

        // ✅ Check for valid numeric status
        const possibleStatus = error.status || error.statusCode || error.code;
        if (typeof possibleStatus === 'number' && possibleStatus >= 100 && possibleStatus <= 599) {
            status = possibleStatus;
        }

        // ✅ Check for valid string status that needs mapping
        if (typeof possibleStatus === 'string') {
            const statusMap: Record<string, number> = {
                'error': HttpStatus.BAD_REQUEST,
                'bad_request': HttpStatus.BAD_REQUEST,
                'bad-request': HttpStatus.BAD_REQUEST,
                'unauthorized': HttpStatus.UNAUTHORIZED,
                'forbidden': HttpStatus.FORBIDDEN,
                'not_found': HttpStatus.NOT_FOUND,
                'not-found': HttpStatus.NOT_FOUND,
                'conflict': HttpStatus.CONFLICT,
                'validation': HttpStatus.UNPROCESSABLE_ENTITY,
                'unprocessable_entity': HttpStatus.UNPROCESSABLE_ENTITY,
                'server_error': HttpStatus.INTERNAL_SERVER_ERROR,
                'internal_server_error': HttpStatus.INTERNAL_SERVER_ERROR,
                'success': HttpStatus.OK,
                'created': HttpStatus.CREATED,
                'accepted': HttpStatus.ACCEPTED,
                'no_content': HttpStatus.NO_CONTENT,
                'bad_gateway': HttpStatus.BAD_GATEWAY,
                'service_unavailable': HttpStatus.SERVICE_UNAVAILABLE,
                'gateway_timeout': HttpStatus.GATEWAY_TIMEOUT,
            };

            const mappedStatus = statusMap[possibleStatus.toLowerCase()];
            if (mappedStatus) {
                status = mappedStatus;
            }
        }

        // ✅ Get message from various sources
        if (error.message) {
            message = error.message;
        } else if (error.error) {
            message = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
        } else if (error.data?.message) {
            message = error.data.message;
        } else if (typeof error === 'string') {
            message = error;
        }

        // ✅ Get error type
        if (error.error && typeof error.error === 'string') {
            errorType = error.error;
        } else if (error.name) {
            errorType = error.name;
        } else {
            errorType = HttpStatus[status] || 'Unknown Error';
        }

        // ✅ Ensure we don't expose internal errors in production
        if (process.env.NODE_ENV === 'production' && status === HttpStatus.INTERNAL_SERVER_ERROR) {
            message = 'Internal server error';
            errorType = 'Internal Server Error';
        }

        return { status, message, error: errorType };
    }
}