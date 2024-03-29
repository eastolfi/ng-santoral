import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthModule as Auth0Module, AuthHttpInterceptor } from '@auth0/auth0-angular';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SharedModule } from '@frontend/shared/shared.module';
import { AuthService } from '@frontend/shared/services/auth.service';
import { environment } from '@frontend/envs/environment';

import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const enableServiceWorker = (): boolean => {
    const isEnabledFromProp = (environment.enableLocalServiceWorker as boolean | undefined) === true;
    const enabled = isEnabledFromProp || !isDevMode();
    if (enabled) console.log('Enabling service worker...', enabled);
    return enabled;
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        Auth0Module.forRoot({
            domain: environment.auth0domain,
            clientId: environment.auth0client,
            authorizationParams: {
                redirect_uri: window.location.origin,
                audience: environment.auth0audience,
                scope: 'read:current_user',
            },
            httpInterceptor: {
                allowedList: [`${environment.apiUrl}/*`]
            },
        }),
        SharedModule,
        FeaturesModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: enableServiceWorker(),
            // Register the ServiceWorker as soon as the application is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000',
        }),
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
