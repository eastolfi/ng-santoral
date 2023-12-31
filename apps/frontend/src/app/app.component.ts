import { Component, OnDestroy, computed, signal } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { User } from '@auth0/auth0-angular';
import { Subscription, filter, map, mergeMap } from 'rxjs';

import { AuthService } from '@frontend/shared/services/auth.service';
import {
    BottomNavigationComponent,
    BottomNavigationConfig,
} from '@frontend/shared/components/ui/bottom-navigation/bottom-navigation.component';
import { ToastService } from '@frontend/shared/services/toast.service';

@Component({
    selector: 'snt-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    public bottomNavConfig!: BottomNavigationConfig;
    public messages = ToastService.messages;

    private subscriptions: Subscription[] = [];

    constructor(
        private readonly auth: AuthService,
        private readonly swUpdate: SwUpdate,
    ) {
        this.initBottomNavigation();
        this.checkForUpdates()
    }

    public checkForUpdates(): void {
        this.swUpdate.versionUpdates
            .pipe(
                filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
                map((evt) => ({
                    type: 'UPDATE_AVAILABLE',
                    current: evt.currentVersion,
                    available: evt.latestVersion,
                })),
            )
            .subscribe((evt) => {
                console.log(evt);
                ToastService.alert(`A new version is available, please reload`, true).then(() => window.location.reload());
            });
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
                action: '/calendar',
            })
            .addItem({
                label: 'Log In',
                icon: 'fa-solid fa-arrow-right-to-bracket',
                action: () => this.auth.login(),
                displaySignal: nonConnectedSignal,
            })
            .addItem({
                label: 'Import',
                icon: 'fa-solid fa-file-import',
                action: '/import',
                displaySignal: isConnectedSignal,
            })
            // .addItem({
            //     label: computed(() => userSignal()?.nickname || userSignal()?.email || 'Account'),
            //     icon: 'fa-regular fa-user',
            //     action: '',
            //     displaySignal: isConnectedSignal
            // })
            .addItem({
                label: 'Log Out',
                icon: 'fa-solid fa-arrow-right-from-bracket',
                action: () => this.auth.logout(),
                displaySignal: isConnectedSignal,
            })
            .finish();

        this.subscriptions.push(
            this.auth.auth0.isAuthenticated$
                .pipe(
                    mergeMap((connected) =>
                        this.auth.auth0.user$.pipe(
                            map((user) => ({ connected, user })),
                        ),
                    ),
                )
                .subscribe(({ connected, user }) => {
                    connectedSignal.set(connected);

                    if (connected && user) {
                        userSignal.set(user);
                    }
                }),
        );
    }

    public get isConnected(): boolean {
        return this.auth.isConnected();
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((s) => s.unsubscribe());
    }
}
