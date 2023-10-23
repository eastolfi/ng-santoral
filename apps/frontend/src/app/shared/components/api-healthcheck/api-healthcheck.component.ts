import { Component } from '@angular/core';
import { catchError, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { environment } from '@frontend/envs/environment';


@Component({
    selector: 'snt-api-healthcheck',
    templateUrl: './api-healthcheck.component.html',
    styleUrls: ['./api-healthcheck.component.scss'],
})
export class ApiHealthcheckComponent {
    public apiOk = false;
    public apiKo = false;

    constructor(
        private readonly http: HttpClient,
    ) {
        this.http.get(`${environment.apiUrl}/healthcheck`)
        .pipe(catchError((error) => {
            return of(error);
        }))
        .subscribe((result: boolean | string) => {
            if (result === true) {
                this.apiOk = true;
                this.apiKo = false;
            } else {
                console.error(result);

                this.apiOk = false;
                this.apiKo = true;
            }
        });
    }
}
