import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, map, mergeMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

// import { environment } from '@environments/environment';
// import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepting ' + request.url)
        return this.auth.auth0.getAccessTokenSilently(/*{
            authorizationParams: {
                audience:
            }
        }*/).pipe(
            mergeMap(token => {
                const isApiUrl = request.url.indexOf('/api') !== -1;//startsWith(environment.apiUrl);
                if (isApiUrl) {
                    request = request.clone({
                        setHeaders: { Authorization: `Bearer ${token}` }
                    })
                }
                return next.handle(request);
            })
        )
        // add auth header with jwt if account is logged in and request is to the api url
        // const account = this.accountService.accountValue;
        // const isLoggedIn = account?.token;
        // const isApiUrl = request.url.indexOf('/api') !== -1;//startsWith(environment.apiUrl);
        // if (/*isLoggedIn && */isApiUrl) {
        //     request = request.clone({
        //         setHeaders: { Authorization: `Bearer ${account.token}` }
        //     });
        // }

        // return next.handle(request);
    }
}
