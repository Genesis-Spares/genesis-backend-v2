
export interface JwtPayload {
    sub: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}
