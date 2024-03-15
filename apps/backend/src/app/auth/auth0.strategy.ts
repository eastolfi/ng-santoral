import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Auth0Profile } from '../models/request.auth0';
import { AppConfigService } from '../config/config.service';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
    constructor(
        private readonly authService: AuthService,
        readonly configService: AppConfigService
    ) {
        super({
            domain: configService.getOrThrow('AUTH0_DOMAIN'),
            clientID: configService.getOrThrow('AUTH0_CLIENT_ID'),
            clientSecret: configService.getOrThrow('AUTH0_CLIENT_SECRET'),
            callbackURL: configService.getOrThrow('AUTH0_CALLBACK_URL'),
            scope: 'openid email profile',
            state: false,
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        { emails, displayName, user_id, provider }: Auth0Profile
    ): Promise<Omit<User, 'password'>> {
        console.log(accessToken);
        console.log(refreshToken);

        return await this.authService.validateAuth0User({
            username: emails[0].value,
            id: user_id,
            displayName,
            provider,
        });
    }
}
