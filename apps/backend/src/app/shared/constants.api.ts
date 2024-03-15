import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';
import { CanActivate } from '@nestjs/common';
import { CustomJwtGuard } from '../auth/jwt.guard';

export enum Tags {
    DEBUG = 'DEBUG',
    EVENTS = 'EVENTS',
    IMPORT = 'IMPORT',
    REFERENTIAL = 'REFERENTIAL',
    USERS = 'USERS',
    AUTH = 'AUTH',
}

export const API_BEARER_NAME = 'api-access-token';

type Guard = new (...args: any[]) => CanActivate;
export const JwtAuthGuard: () => Guard = () => CustomJwtGuard;

export const Auth0Guard: () => Type<IAuthGuard> = () => AuthGuard('auth0');
// export const JwtAuthGuard: () => Type<IAuthGuard> = () => AuthGuard('jwt');
