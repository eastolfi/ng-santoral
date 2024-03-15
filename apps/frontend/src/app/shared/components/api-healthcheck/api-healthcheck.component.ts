import { Component } from '@angular/core';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '@frontend/envs/environment';

enum ApiHealthcheckState {
    OK = 'OK',
    KO = 'KO',
    SECURED = 'SECURED',
}

@Component({
    selector: 'snt-api-healthcheck',
    templateUrl: './api-healthcheck.component.html',
    styleUrls: ['./api-healthcheck.component.scss'],
})
export class ApiHealthcheckComponent {
    public state: ApiHealthcheckState = ApiHealthcheckState.KO;

    constructor(
        private readonly http: HttpClient,
    ) {
        this.http.get<boolean>(`${environment.apiUrl}/healthcheck`)
        .pipe(
            mergeMap((isOk) =>
                isOk ? this.checkSecured() : of(ApiHealthcheckState.KO)),
            catchError((error) => {
                console.log(error);
                return of(ApiHealthcheckState.KO);
            })
        )
        .subscribe((result: ApiHealthcheckState) => {
            this.state = result;
        });
    }

    public getClassList(): string {
        switch (this.state) {
            case ApiHealthcheckState.OK:
                return 'ok';
            case ApiHealthcheckState.SECURED:
                return 'ok secured';
            case ApiHealthcheckState.KO:
            default:
                return 'ko';
        }
    }

    private checkSecured(): Observable<ApiHealthcheckState> {
        return this.http.get<boolean>(`${environment.apiUrl}/healthcheck/secured`)
            .pipe(
                map(secured => secured ? ApiHealthcheckState.SECURED : ApiHealthcheckState.OK),
                catchError((error) => {
                    return of(error);
                })
            )
    }
}
