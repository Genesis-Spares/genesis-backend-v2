export interface JwtPayload {
    sub: string;
    email: string;
    roles: string[];
    permissions: string[]; // "resource:action"
}

export interface RequestWithUser extends Request {
    user: JwtPayload;
}