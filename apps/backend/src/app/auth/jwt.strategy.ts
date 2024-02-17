import { ExecutionContext, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';
// import { jwtConstants } from '../app.controller';

dotenv.config();

// https://stackoverflow.com/questions/75771282/nestjs-authguard-jwt-auth0-constantly-returns-401-unauthorized

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `${process.env.AUTH0_ISSUER_URL}.well-known/jwks.json`,
            }),
            // secretOrKey: jwtConstants.secret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `${process.env.AUTH0_ISSUER_URL}`,
            algorithms: ['RS256'],
        });
    }

    canActivate(context: ExecutionContext) {
        console.log(1)
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        // return super.canActivate(context);
        return true;
      }

    validate(payload: unknown): unknown {
        return payload;
    }
}
