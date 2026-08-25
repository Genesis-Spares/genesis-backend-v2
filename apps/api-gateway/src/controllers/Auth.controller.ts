import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { RegisterDto, LoginDto, RefreshDto } from '../dto/Auth.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.forward('auth.register', dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.forward('auth.login', dto)
    }

    @Post('refresh')
    refresh(@Body() dto: RefreshDto) {
        return this.forward('auth.refresh', dto);
    }

    private forward(pattern: string, payload: unknown) {
        return firstValueFrom(
            this.authClient.send(pattern, payload).pipe(
                catchError((error) => {
                    console.error(`Error in pattern ${pattern}:`, error);

                    // ✅ Extract and normalize error
                    const { status, message } = this.normalizeError(error);

                    throw new HttpException(
                        {
                            statusCode: status,
                            message: message,
                            error: HttpStatus[status] || 'Unknown Error',
                            timestamp: new Date().toISOString(),
                            path: pattern,
                        },
                        status
                    );
                }),
            ),
        );
    }

    private normalizeError(error: any): { status: number; message: string } {
        // Default values
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Auth service error';

        if (!error) {
            return { status, message };
        }

        // Check for valid numeric status
        const possibleStatus = error.status || error.statusCode || error.code;
        if (typeof possibleStatus === 'number' && possibleStatus >= 100 && possibleStatus <= 599) {
            status = possibleStatus;
        }

        // Check for valid string status that needs mapping
        if (typeof possibleStatus === 'string') {
            const statusMap: Record<string, number> = {
                'error': HttpStatus.BAD_REQUEST,
                'bad_request': HttpStatus.BAD_REQUEST,
                'unauthorized': HttpStatus.UNAUTHORIZED,
                'forbidden': HttpStatus.FORBIDDEN,
                'not_found': HttpStatus.NOT_FOUND,
                'conflict': HttpStatus.CONFLICT,
                'validation': HttpStatus.UNPROCESSABLE_ENTITY,
                'server_error': HttpStatus.INTERNAL_SERVER_ERROR,
            };

            const mappedStatus = statusMap[possibleStatus.toLowerCase()];
            if (mappedStatus) {
                status = mappedStatus;
            }
        }

        // Get message
        if (error.message) {
            message = error.message;
        } else if (error.error) {
            message = typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
        } else if (error.data?.message) {
            message = error.data.message;
        }

        // Ensure we don't expose internal errors in production
        if (process.env.NODE_ENV === 'production' && status === HttpStatus.INTERNAL_SERVER_ERROR) {
            message = 'Internal server error';
        }

        return { status, message };
    }

}