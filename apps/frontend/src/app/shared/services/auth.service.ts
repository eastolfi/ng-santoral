import { Injectable, OnDestroy } from '@angular/core';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { Observable, Subscription, filter, map } from 'rxjs';

@Injectable()
export class AuthService implements OnDestroy {
    private subscriptions: Subscription[] = [];
    private _connected = false;

    constructor(private readonly auth: Auth0Service) {
        this.subscriptions.push(this.auth.isAuthenticated$.subscribe(value => this._connected = value))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public get auth0(): Auth0Service {
        return this.auth;
    }

    public login(): void {
        this.auth0.loginWithRedirect();
    }

    public logout(): void {
        this.auth0.logout({
            logoutParams: { returnTo: document.location.href }
        });
    }

    public isConnected(): boolean {
        return this._connected;
    }

    public isAuthorized$(role: string): Observable<boolean> {
        return this.auth.user$.pipe(
            map((user: User | null | undefined) => ((user || {})['santoral/roles'] || []) as string[]),
            map(userRoles => userRoles.indexOf(role) !== -1),
        );
    }
}
