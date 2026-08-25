import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException('Missing bearer token');
        }

        try {
            const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
            request.user = payload;
            return true;
        } catch (err) {
            throw new UnauthorizedException(JSON.stringify(err));
        }
    }

    private extractToken(request: Request & { headers: Record<string, string> }): string | null {
        const header = request.headers['authorization'];
        if (!header) return null;
        const [type, token] = header.split(' ');
        return type === 'Bearer' ? token : null;
    }
}