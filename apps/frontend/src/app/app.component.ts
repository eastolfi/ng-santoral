import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'ng-santoral-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'frontend';

  constructor(
    http: HttpClient
  ) {
    const logRes = (url: string) => {
        return (result: any) => {
            console.log(url);
            console.log(result);
        }
    }

    [environment.apiUrl, 'http://backend/api', 'http://backend:3009/api', 'http://192.168.1.119:3009/api'].map((url: string) => {
        return http.get(url).pipe(catchError(error => of(error))).subscribe(logRes(url));
    })
  }
}
