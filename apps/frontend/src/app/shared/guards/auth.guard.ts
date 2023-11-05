import { Injectable } from '@angular/core';
import {
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard {
    constructor(
        private router: Router,
        private authService: AuthService,
    ) {}

    // https://community.auth0.com/t/angular-8-isauthenticated-race-condition/37474/3
    canActivate(): Observable<boolean> {
        return this.authService.auth0.user$.pipe(
            map((user) => {
                if (user) {
                    return true;
                } else {
                    this.router.navigate([`/home`]);
                    return false;
                }
            }),
        );
    }
}
