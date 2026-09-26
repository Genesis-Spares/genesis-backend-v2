import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// Any key whose name contains one of these (case-insensitive) is never logged:
// tokens, passwords, OTPs, M-Pesa credentials, cookies, auth headers...
const SENSITIVE_KEY =
  /pass(word|key)?|token|secret|otp|authorization|cookie|api[-_]?key|credential|pin$|cvv|card/i;
const REDACTED = '***REDACTED***';
const MAX_DEPTH = 5;
const MAX_ARRAY_ITEMS = 3;

/**
 * Logs one line per request and response. Request/response bodies are only logged
 * when LOG_BODIES=true (off by default in production), and even then every
 * sensitive field is redacted at any depth, so tokens and passwords never reach the logs.
 */
@Injectable()
export class SafeLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('API-Gateway');
  private readonly logBodies =
    (process.env.LOG_BODIES ??
      (process.env.NODE_ENV === 'production' ? 'false' : 'true')) === 'true';

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') return next.handle();

    const request = context.switchToHttp().getRequest();
    const method: string = request.method;
    const url = SafeLoggingInterceptor.redactUrl(
      request.originalUrl ?? request.url ?? '',
    );
    const ip = request.ip;
    const startTime = Date.now();

    this.logger.log(`📥 ${method} ${url} from ${ip}`);
    if (
      this.logBodies &&
      request.body &&
      Object.keys(request.body).length > 0
    ) {
      this.logger.debug(`   Request: ${this.stringify(request.body)}`);
    }

    return next.handle().pipe(
      tap((data) => {
        this.logger.log(`📤 ${method} ${url} - ${Date.now() - startTime}ms`);
        if (this.logBodies && data !== undefined) {
          this.logger.debug(`   Response: ${this.stringify(data)}`);
        }
      }),
      catchError((error) => {
        const status = error?.status ?? error?.statusCode;
        const line = `❌ ${method} ${url} - ${Date.now() - startTime}ms${status ? ` (${status})` : ''}: ${error?.message}`;
        // client errors (bad input, auth failures) are routine; only server errors get a stack
        if (status && status < 500) {
          this.logger.warn(line);
        } else {
          this.logger.error(line, error?.stack?.substring(0, 500));
        }
        throw error;
      }),
    );
  }

  /** Strip secrets from the path (M-Pesa callback secret) and from query parameters. */
  static redactUrl(url: string): string {
    const [path, query] = url.split('?', 2);
    const safePath = path.replace(
      /(\/mpesa\/callback\/)[^/]+/i,
      `$1${REDACTED}`,
    );
    if (!query) return safePath;
    const safeQuery = query
      .split('&')
      .map((pair) => {
        const [key] = pair.split('=', 1);
        return SENSITIVE_KEY.test(decodeURIComponent(key || '')) ||
          /^(code|sig|signature)$/i.test(key)
          ? `${key}=${REDACTED}`
          : pair;
      })
      .join('&');
    return `${safePath}?${safeQuery}`;
  }

  /** Deep copy with every sensitive key redacted; large arrays and deep nesting are summarised. */
  static redact(value: any, depth = 0): any {
    if (value === null || typeof value !== 'object') {
      return typeof value === 'string' &&
        /^eyJ[\w-]+\.[\w-]+\.[\w-]+$/.test(value)
        ? REDACTED
        : value; // bare JWTs
    }
    if (depth >= MAX_DEPTH)
      return Array.isArray(value) ? `[Array:${value.length}]` : '[Object]';
    if (value instanceof Date) return value.toISOString();
    if (Buffer.isBuffer(value)) return `[Buffer:${value.length}]`;

    if (Array.isArray(value)) {
      const items = value
        .slice(0, MAX_ARRAY_ITEMS)
        .map((v) => SafeLoggingInterceptor.redact(v, depth + 1));
      if (value.length > MAX_ARRAY_ITEMS)
        items.push(`…${value.length - MAX_ARRAY_ITEMS} more`);
      return items;
    }

    const out: Record<string, any> = {};
    for (const [key, v] of Object.entries(value)) {
      out[key] = SENSITIVE_KEY.test(key)
        ? REDACTED
        : SafeLoggingInterceptor.redact(v, depth + 1);
    }
    return out;
  }

  private stringify(value: any): string {
    try {
      const text = JSON.stringify(SafeLoggingInterceptor.redact(value));
      return text && text.length > 2000 ? `${text.slice(0, 2000)}…` : text;
    } catch {
      return '[unserialisable]';
    }
  }
}
