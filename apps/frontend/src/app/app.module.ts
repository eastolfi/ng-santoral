import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule as Auth0Module } from '@auth0/auth0-angular';

import { SharedModule } from '@frontend/shared/shared.module';
import { AuthService } from '@frontend/shared/services/auth.service';
import { environment } from '@frontend/envs/environment';

import { FeaturesModule } from './features/features.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    ],
    providers: [AuthService],
    bootstrap: [AppComponent],
})
export class AppModule {}
