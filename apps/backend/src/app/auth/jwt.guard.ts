import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RequestAuth0, UserAuth0 } from '../models/request.auth0';
import { authenticate } from './verify';
import { decodeToken } from './verify/token';

@Injectable()
export class CustomJwtGuard implements CanActivate {
    constructor(private readonly authService: AuthService) {
    }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const [request, response] = [context.switchToHttp().getRequest() as RequestAuth0, context.switchToHttp().getResponse()]

        const opts = {
            issuer: process.env.AUTH0_ISSUER_URL,
            issuerBaseURL: process.env.AUTH0_ISSUER_URL,
            audience: process.env.AUTH0_AUDIENCE,
            // TOKEN
            allowedAudiences: [process.env.AUTH0_AUDIENCE],
            jwksUri: `${process.env.AUTH0_ISSUER_URL}/.well-known/jwks.json`
        };

        await authenticate(request, response, opts);

        const { payload: decoded } = decodeToken(request);
        const { email, provider, providerId: id } = this.parseDecodedToken(decoded);

        const user = await this.authService.validateAuth0User({
            username: email,
            provider, id,
            displayName: null,
        });

        request.user = decoded;

        return !!user;
    }

    private parseDecodedToken(payload: UserAuth0): { email: string, provider: string, providerId: string } {
        const email = payload['santoral/email'];
        const sub = payload['sub'];
        const [provider, id] = sub.split('|');

        return { email, provider, providerId: id };
    }
}
