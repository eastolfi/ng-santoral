import { errors } from './errors';
import { JWT } from 'jose';
import { UserAuth0 } from '../../models/request.auth0';

const getTokenFromHeader = (req) => {
    if (!req.headers || !req.headers.authorization) {
        return;
    }

    const match = req.headers.authorization.match(/^Bearer\s(.*)$/);
    if (!match) {
        return;
    }

    return match[1];
};

const methodsWithoutBody = ['GET', 'HEAD', 'DELETE'];

const getTokenFromQueryString = (req) => {
    if (req.query &&
        typeof req.query.access_token === 'string' &&
        methodsWithoutBody.includes(req.method)) {
        console.log(req.query.access_token)
        return req.query.access_token;
    }
};

const getFromBody = (req) => {
    if (req.body &&
        typeof req.body.access_token === 'string' &&
        !methodsWithoutBody.includes(req.method) &&
        req.headers &&
        req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        console.log(req.body.access_token)
        return req.body.access_token;
    }
};

export const getToken = (req): string => {
    const fromQuery = getTokenFromQueryString(req);
    const fromHeader = getTokenFromHeader(req);
    const fromBody = getFromBody(req);

    const hasNoToken = !fromQuery && !fromHeader && !fromBody;
    if(hasNoToken) {
        throw errors.createInvalidRequestError('bearer token is missing');
    }

    const hasMoreThanOne = [fromQuery, fromBody, fromHeader].filter(Boolean).length > 1;
    if(hasMoreThanOne) {
        throw errors.createInvalidRequestError('more than one method used for authentication');
    }

    return fromQuery || fromBody || fromHeader;
}

export const decodeToken = (req): { payload: UserAuth0, header: any } => {
    const token = getToken(req);
    return JWT.decode(token, { complete: true }) as { payload: UserAuth0, header: any };
}
