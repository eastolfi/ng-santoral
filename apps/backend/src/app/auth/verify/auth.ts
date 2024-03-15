import { getToken } from './token';
import { openid } from './openid';
import { errors } from './errors';
import { promisify } from 'util';


const auth = function(params) {
    console.log('init auth')
    if (typeof params === 'undefined') {
        params = {};
    } else if(typeof params === 'function') {
        params = { strategy: params, getToken: getToken };
    } else if(typeof params !== 'object') {
        throw new Error('expected object or function');
    }

    if(!params.getToken) {
        params.getToken = getToken;
    }

    if(!params.strategy) {
        params.strategy = openid(params);
    }

    return async (req, res, next): Promise<void> => {
        try {
            const token = params.getToken(req);
            req.auth =  await params.strategy(token);
            if (!req.auth) {
                return next(errors.createInvalidTokenError());
            }
            next();
        } catch(err) {
            return next(errors.createInvalidTokenError(err.message));
        }
    };
}

export const authenticate = async (request, response, opts) => {
    return await promisify(auth(opts))(request, response);
}
