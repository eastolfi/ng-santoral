// Used to force namespace from Multer
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Options } from 'multer';
import { Strategy } from 'passport-auth0';

export interface UserAuth0 extends Express.User {
    ['santoral/email']: string;
    ['santoral/roles']: string[];
    sub: string;
}

export interface RequestAuth0 extends Express.Request {
    user: UserAuth0 | undefined;
}

export type MulterFile = Express.Multer.File;

export interface Auth0Profile extends Strategy.Profile {
    user_id: string;
}
