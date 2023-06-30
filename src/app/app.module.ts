import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule as Auth0Module } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FeaturesModule } from './features/features.module';
import { AuthService } from './features/shared/services/auth.service';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        Auth0Module.forRoot({
            domain: import.meta.env.NG_APP_AUTH0_DOMAIN,
            clientId: import.meta.env.NG_APP_AUTH0_CLIENT_ID,
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
