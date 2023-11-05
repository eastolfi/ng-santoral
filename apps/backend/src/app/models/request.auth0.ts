export interface UserAuth0 extends Express.User {
    ['santoral/email']: string;
    ['santoral/roles']: string[];
}

export interface RequestAuth0 extends Express.Request {
    user: UserAuth0 | undefined;
}
