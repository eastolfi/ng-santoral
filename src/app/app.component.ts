import { Component, OnDestroy, computed, signal } from '@angular/core';
import { User } from '@auth0/auth0-angular';
import { Subscription, map, mergeMap } from 'rxjs';

import { AuthService } from './features/shared/services/auth.service';
import {
    BottomNavigationComponent,
    BottomNavigationConfig
} from './shared/components/ui/bottom-navigation/bottom-navigation.component';

@Component({
    selector: 'snt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    public bottomNavConfig!: BottomNavigationConfig;

    private subscriptions: Subscription[] = [];

    constructor(private readonly auth: AuthService) {
        this.initBottomNavigation();
    }

    private initBottomNavigation(): void {
        const userSignal = signal<User | null>(null);
        const connectedSignal = signal(false);
        const isConnectedSignal = computed(() => connectedSignal());
        const nonConnectedSignal = computed(() => !connectedSignal());

        this.bottomNavConfig = BottomNavigationComponent.configurate()
        .addItem({
            label: 'Calendar',
            icon: 'fa-solid fa-calendar-days',
            action: '/calendar'
        })
        .addItem({
            label: 'Import',
            icon: 'fa-solid fa-upload',
            action: '/import',
            displaySignal: isConnectedSignal
        })
        .addItem({
            label: 'Export',
            icon: 'fa-solid fa-download',
            action: '/export',
            displaySignal: isConnectedSignal
        })
        .addItem({
            label: 'Log In',
            icon: 'fa-solid fa-arrow-right-to-bracket',
            action: () => this.auth.login(),
            displaySignal: nonConnectedSignal
        })
        .addItem({
            label: 'Log Out',
            icon: 'fa-solid fa-arrow-right-from-bracket',
            action: () => this.auth.logout(),
            displaySignal: isConnectedSignal
        })
        .addItem({
            label: computed(() => userSignal()?.nickname || userSignal()?.email || 'Account'),
            icon: 'fa-regular fa-user',
            action: '',
            displaySignal: isConnectedSignal
        })
        .finish();

        this.subscriptions.push(this.auth.auth0.isAuthenticated$.pipe(
            mergeMap(connected => this.auth.auth0.user$.pipe(map(user => ({ connected, user }))))
        ).subscribe(({ connected, user }) => {
            connectedSignal.set(connected);

            if (connected && user) {
                userSignal.set(user);
            }
        }));
    }

    public get isConnected(): boolean {
        return this.auth.isConnected();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }
}
