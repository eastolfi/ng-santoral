// Used to force namespace from Multer
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Options } from 'multer';

export interface UserAuth0 extends Express.User {
    ['santoral/email']: string;
    ['santoral/roles']: string[];
}

export interface RequestAuth0 extends Express.Request {
    user: UserAuth0 | undefined;
}

export type MulterFile = Express.Multer.File;
