import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule as Auth0Module } from '@auth0/auth0-angular';

import { SharedModule } from '@frontend/shared/shared.module';
import { AuthService } from '@frontend/shared/services/auth.service';
import { environment } from '@frontend/envs/environment';

import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        Auth0Module.forRoot({
            domain: environment.auth0domain,
            clientId: environment.auth0domain,
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        }),
        SharedModule,
        FeaturesModule,
        AppRoutingModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        }),
    ],
    providers: [AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
