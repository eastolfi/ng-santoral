import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';

export enum Tags {
    DEBUG = 'DEBUG',
    EVENTS = 'EVENTS',
    IMPORT = 'IMPORT',
    REFERENTIAL = 'REFERENTIAL',
    USERS = 'USERS',
    AUTH = 'AUTH',
}

export const API_BEARER_NAME = 'api-access-token';

export const JwtAuthGuard: () => Type<IAuthGuard> = () => AuthGuard('jwt');
export const Auth0Guard: () => Type<IAuthGuard> = () => AuthGuard('auth0');
