import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';

export enum Tags {
    DEBUG = 'DEBUG',
    EVENTS = 'EVENTS',
    IMPORT = 'IMPORT',
    REFERENTIAL = 'REFERENTIAL',
}

export const API_BEARER_NAME = 'api-access-token';

export const AuthJwtGuard: () => Type<IAuthGuard> = () => AuthGuard('jwt');
