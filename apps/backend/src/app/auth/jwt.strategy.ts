import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { UserAuth0 } from '../models/request.auth0';
import { User } from '@prisma/client';
import { AuthService, Oauth2Profile } from './auth.service';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        readonly configService: AppConfigService,
    ) {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${configService.getOrThrow('AUTH0_ISSUER_URL')}/.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            audience: configService.getOrThrow('AUTH0_AUDIENCE'),
            issuer: `${configService.getOrThrow('AUTH0_ISSUER_URL')}/`,
            algorithms: ['RS256'],
        });

        this.checkEnvs();
    }

    async validate(
        payload: UserAuth0,
    ): Promise<Omit<User, 'password'>> {
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

    private checkEnvs(): void {
        console.log('Checking envs');

        console.log('AUTH0_ISSUER_URL', !!`${process.env.AUTH0_ISSUER_URL}`.length, process.env.AUTH0_ISSUER_URL);
        console.log('AUTH0_AUDIENCE', !!`${process.env.AUTH0_AUDIENCE}`.length, process.env.AUTH0_AUDIENCE);
    }
}
