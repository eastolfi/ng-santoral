import { CanActivate, Controller, ExecutionContext, Get, Injectable, Request as Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
// import { JwtService } from '@nestjs/jwt';
// import * as jws from 'jws';

import { AppService } from './app.service';
import { API_BEARER_NAME, JwtAuthGuard, Tags } from './shared/constants.api';
// import { Request } from 'express';
// import { Observable } from 'rxjs';
// import passport from 'passport';

// export const jwtConstants = {
//     secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
// };

// const createPassportContext =
//   (request, response) => (type, options, callback) =>
//     new Promise<void>((resolve, reject) =>
//       passport.authenticate(type, options, (err, user, info, status) => {
//         try {
//             console.log('info')
//             console.log(info)
//             console.log('status')
//             console.log(status)
//             console.log('user')
//             console.log(user)
//           request.authInfo = info;
//           return resolve(callback(err, user, info, status));
//         } catch (err) {
//             console.log(1)
//             console.error(err)
//           reject(err);
//         }
//       })(request, response, (err) => (err ? reject(err) : resolve()))
//     );

// @Injectable()
// class CustomGuard implements CanActivate {
//     constructor(private jwtService: JwtService) {}

//     async canActivate(context: ExecutionContext) {
//         const request = context.switchToHttp().getRequest()
//         const response = context.switchToHttp().getResponse()
//         const passportFn = createPassportContext(request, response)

//         const user = passportFn('jwt', {
//             session: false,
//             property: 'user'
//           }, (err, user, info, status) => {
//             if (err || !user) {
//                 throw err || new UnauthorizedException();
//               }
//               return user;
//           })
//           request.user = user;

//         return true;
//     }

//     async canActivate2(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = this.extractTokenFromHeader(request);
//         console.log('Token')
//         console.log(token)
//         console.log('Decoded')
//         // console.log(parseJwt(token))
//         console.log(decode(token, { complete: true }))
//         if (!token) {
//           throw new UnauthorizedException();
//         }
//         try {
//             const payload = this.jwtService.verify(token, {
//                 secret: '-jbkot_lshSvRbclz-plkF8AL3Y6aOb8Qc1YXDh2309pTfMuFTfOOsJh_HueP6DU',
//                 algorithms: [ 'RS256', 'HS256' ],
//                 // ty
//             })
//         //   const payload = await this.jwtService.verifyAsync(
//         //     token,
//         //     {
//         //       secret: jwtConstants.secret,
//         //     //   algorithms: ['RS256']
//         //     }
//         //   ).then(r => {
//         //     console.log('Then')
//         //     console.log(r)
//         //     return r
//         //   }).catch(err => {
//         //     console.log(err)
//         //     throw err
//         //   });
//           console.log('Payload')
//           console.log(payload)
//           // 💡 We're assigning the payload to the request object here
//           // so that we can access it in our route handlers
//           request['user'] = payload;
//         } catch (error) {
//             console.error(error)
//           throw new UnauthorizedException();
//         }
//         return true;
//       }

//       private extractTokenFromHeader(request: Request): string | undefined {
//         const [type, token] = request.headers.authorization?.split(' ') ?? [];
//         return type === 'Bearer' ? token : undefined;
//       }

// }

@Controller()
@ApiBearerAuth(API_BEARER_NAME)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('healthcheck')
    @ApiTags(Tags.DEBUG)
    public healthCheck() {
        return true;
    }

    @Get('token')
    @ApiTags(Tags.DEBUG)
    // @UseGuards(CustomGuard)
    @UseGuards(JwtAuthGuard)
    public checkToken(@Req() request) {
        console.log(request.user)
        if (request.headers['authorization']) {
            // console.log(request.headers['authorization']);
            const auth_params = parseAuthHeader(request.headers['authorization']);
            if (auth_params && 'bearer' === auth_params.scheme.toLowerCase()) {
                return { token: parseJwt(auth_params.value) }
            }
        } else {
            return { token: null }
        }
    }
}

function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

function parseAuthHeader(hdrValue) {
    const re = /(\S+)\s+(\S+)/;
    if (typeof hdrValue !== 'string') {
        return null;
    }
    const matches = hdrValue.match(re);
    // console.log(matches)
    return matches && { scheme: matches[1], value: matches[2] };
}

// function decode(jwt, options) {
//     options = options || {};
//     const decoded = jws.decode(jwt, options);
//     if (!decoded) { return null; }
//     let payload = decoded.payload;

//     //try parse the payload
//     if(typeof payload === 'string') {
//       try {
//         const obj = JSON.parse(payload);
//         if(obj !== null && typeof obj === 'object') {
//           payload = obj;
//         }
//       } catch (e) {
//         console.log(e)
//       }
//     }

//     //return header if `complete` option is enabled.  header includes claims
//     //such as `kid` and `alg` used to select the key within a JWKS needed to
//     //verify the signature
//     if (options.complete === true) {
//       return {
//         header: decoded.header,
//         payload: payload,
//         signature: decoded.signature
//       };
//     }
//     return payload;
//   };
