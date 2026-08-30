
export interface JwtPayload {
    sub: string;
    email: string;
    roles: string[];
    permissions: string[];
    emailVerified?: boolean;
    iat: number;
    exp: number;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
