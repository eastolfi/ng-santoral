import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard, IAuthGuard, Type } from '@nestjs/passport';

export enum Tags {
    DEBUG = 'DEBUG',
    EVENTS = 'EVENTS',
    IMPORT = 'IMPORT',
    REFERENTIAL = 'REFERENTIAL',
}

export const API_BEARER_NAME = 'api-access-token';

export const AuthJwtGuard: () => Type<IAuthGuard> = () => AuthGuard('jwt');

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(
        // ...args: Parameters<
        //     InstanceType<ReturnType<typeof AuthGuard>>['handleRequest']
        // >
        err: any, user: any, info: any, context: ExecutionContext, status?: any
    ) {
        console.log('----- Checking request -----')
        // console.log(args);
        console.log('error')
        console.log(err);
        console.log('user')
        console.log(user);
        console.log('info')
        console.log(info);
        console.log('context')
        console.log(context);
        console.log('status')
        console.log(status);
        console.log('----- End Checking request -----')
        // return super.handleRequest(...args);
        return super.handleRequest(err, user, info, context, status);
    }
}
