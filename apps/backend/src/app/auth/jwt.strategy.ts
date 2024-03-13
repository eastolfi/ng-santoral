import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UserAuth0 } from '../models/request.auth0';
import { User } from '@prisma/client';
import { AuthService, Oauth2Profile } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private readonly authService: AuthService) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.AUTH0_ISSUER_URL}/.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `${process.env.AUTH0_ISSUER_URL}/`,
            algorithms: ['RS256'],
        });
    }

    async validate(
        payload: UserAuth0,
    ): Promise<Omit<User, 'password'>> {
        console.log(process.env.AUTH0_ISSUER_URL)
        return await this.authService.validateAuth0User(this.decodePayload(payload));
    }

    private decodePayload(payload: UserAuth0): Oauth2Profile {
        if (!payload.sub) {
            throw new UnauthorizedException('No provider');
        }

        const [provider, id] = payload.sub.split('|');
        return {
            username: payload['santoral/email'],
            displayName: '',
            id, provider,
        }
    }
}
