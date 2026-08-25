// apps/api-gateway/src/interceptors/safe-logging.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable()
export class SafeLoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('API-Gateway');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const { method, url, ip, body, headers } = request;

        this.logger.log(`📥 ${method} ${url} from ${ip}`);

        // ✅ Log request body safely (without sensitive data)
        if (body && Object.keys(body).length > 0) {
            try {
                const safeBody = this.sanitizeSensitiveData(body);
                this.logger.debug(`   Request: ${JSON.stringify(safeBody)}`);
            } catch {
                this.logger.debug('   Request: [Unable to stringify]');
            }
        }

        const startTime = Date.now();

        return next.handle().pipe(
            tap((data) => {
                const duration = Date.now() - startTime;
                this.logger.log(`📤 ${method} ${url} - ${duration}ms`);

                // ✅ Log response data safely
                if (data) {
                    const safeData = this.getSafeLogData(data);
                    this.logger.debug(`   Response: ${JSON.stringify(safeData)}`);
                }
            }),
            catchError((error) => {
                const duration = Date.now() - startTime;
                this.logger.error(`❌ ${method} ${url} - ${duration}ms`);
                this.logger.error(`   Error: ${error.message}`);
                if (error.stack) {
                    this.logger.error(`   Stack: ${error.stack.substring(0, 300)}...`);
                }
                throw error;
            }),
        );
    }

    private sanitizeSensitiveData(data: any): any {
        if (!data || typeof data !== 'object') return data;

        const sensitiveFields = ['password', 'refreshToken', 'accessToken', 'token', 'secret'];
        const sanitized = { ...data };

        for (const field of sensitiveFields) {
            if (sanitized[field]) {
                sanitized[field] = '***REDACTED***';
            }
        }

        return sanitized;
    }

    private getSafeLogData(data: any): any {
        if (!data) return {};

        // If data is not an object, return it directly
        if (typeof data !== 'object') {
            return { value: data };
        }

        const safe: any = {};

        // ✅ Try to extract common response patterns
        try {
            // Pattern 1: Response with data wrapper
            if (data.data !== undefined) {
                safe.data = this.extractSafeFields(data.data);
            }

            // Pattern 2: Direct response with fields
            const directFields = this.extractSafeFields(data);
            Object.assign(safe, directFields);

            // Pattern 3: Include status/message if present
            if (data.statusCode !== undefined) {
                safe.statusCode = data.statusCode;
            }
            if (data.status !== undefined) {
                safe.status = data.status;
            }
            if (data.message !== undefined) {
                safe.message = data.message;
            }
            if (data.success !== undefined) {
                safe.success = data.success;
            }

            // If nothing was extracted, log basic info
            if (Object.keys(safe).length === 0) {
                const keys = Object.keys(data);
                if (keys.length > 0) {
                    safe._summary = `Response with ${keys.length} fields: ${keys.join(', ')}`;
                    // Include first 3 fields safely
                    for (let i = 0; i < Math.min(3, keys.length); i++) {
                        const key = keys[i];
                        const value = data[key];
                        safe[key] = typeof value === 'object'
                            ? `[${Array.isArray(value) ? 'Array' : 'Object'}]`
                            : value;
                    }
                } else {
                    safe._note = 'Empty response';
                }
            }
        } catch (error) {
            safe._error = 'Unable to extract data';
            safe._message = error.message;
        }

        return safe;
    }

    private extractSafeFields(data: any): any {
        if (!data || typeof data !== 'object') {
            return data !== undefined ? { value: data } : {};
        }

        // Handle arrays
        if (Array.isArray(data)) {
            return {
                arrayLength: data.length,
                firstItem: data.length > 0 ? this.extractSafeFields(data[0]) : null
            };
        }

        const safe: any = {};

        // Common safe fields to extract
        const safeFields = [
            'id', 'userId', 'user_id', 'uuid',
            'name', 'firstName', 'lastName', 'fullName',
            'email', 'username',
            'role', 'roles', 'roleId',
            'message', 'msg', 'description',
            'status', 'statusCode', 'code',
            'success', 'error',
            'createdAt', 'updatedAt', 'timestamp',
            'count', 'total', 'page', 'limit',
            'token', 'accessToken', 'refreshToken',
            'expiresIn', 'expiresAt'
        ];

        for (const field of safeFields) {
            if (data[field] !== undefined && data[field] !== null) {
                const value = data[field];
                safe[field] = typeof value === 'object'
                    ? (Array.isArray(value) ? `[Array:${value.length}]` : '[Object]')
                    : value;
            }
        }

        // If no safe fields found, include count of fields
        if (Object.keys(safe).length === 0) {
            const keys = Object.keys(data);
            if (keys.length > 0) {
                safe._fields = keys.slice(0, 5).join(', ') + (keys.length > 5 ? '...' : '');
                safe._totalFields = keys.length;
            }
        }

        return safe;
    }
}