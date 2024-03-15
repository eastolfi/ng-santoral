import { JWK } from 'jose';
import { Issuer } from 'openid-client';
import { verifyToken } from './verify';

const defaults = {
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    allowedAudiences: process.env.ALLOWED_AUDIENCES && process.env.ALLOWED_AUDIENCES.split(',')
};

const getIssuer = (issuerBaseURL) => {
    return Issuer.discover(issuerBaseURL);
};

export const openid = function(params) {
    params = Object.assign({}, defaults, params || {});

    if (!params.issuerBaseURL) {
        throw new Error('issuerBaseURL is required');
    }

    if (!params.allowedAudiences) {
        throw new Error('allowedAudiences is required');
    }

    return async function(token) {
        const issuer = await getIssuer(params.issuerBaseURL);
        const claims = await verifyToken(token,
            issuer,
            params.allowedAudiences,
            typeof params.clockTolerance === 'number' ? params.clockTolerance : undefined,
            params.clientSecret ? JWK.asKey(params.clientSecret) : params.clientSecret);
        return { token, claims };
    };
}
