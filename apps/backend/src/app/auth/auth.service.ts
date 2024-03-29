import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '@prisma/client';
import { Injectable } from '@nestjs/common';

export type Oauth2Profile = {
    username: string;
    id: string;
    displayName: string;
    provider: string;
};

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {
    }
    async validateAuth0User({ username, id, displayName, provider }: Oauth2Profile): Promise<Omit<User, 'password'>> {
        console.log('Finding user with email ', username);
        let user = await this.usersService.findByEmail(username);

        if (!user) {
            console.log('Creating new user');
            const newUser = {
                email: username,
                name: displayName || username,
                password: '',
                provider: 'auth0',
                provider_extra: provider,
                provider_id: id,
            };

            user = await this.usersService.create(newUser as Omit<User, 'id'>, {
                crudQuery: ''
            });

            console.log('New user created');
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
    }

    async login({ email, id }: any) {
        const payload = { sub: id, username: email };
        const accessToken = this.jwtService.sign(payload);

        console.log(accessToken);
        console.log(this.jwtService.verify(accessToken))    ;

        return {
            access_token: accessToken,
        };
    }
}
