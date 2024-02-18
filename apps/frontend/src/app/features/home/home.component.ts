import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@frontend/envs/environment';

// https://www.reddit.com/r/docker/comments/yk0x2l/cors_error_after_dockerizing_how_to_fix/?rdt=47139
@Component({
    selector: 'snt-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
    public options = [
        // environment.apiUrl,
        '/api',
        '/rest',
        '/resta',
        '/restb',
        // 'https://192.168.1.119:2443/api',
        'https://api/api',
        'https://api:2443/api',
        'https://rest',
        'https://rest/api',
        'https://rest:2443',
        'https://rest:2443/api',
        // '/api/v1',
        // '/api/v2',
        // '/api',
        // //
        // 'api:443/api',          // CORS
        // 'api:2443/api',         // CORS
        // 'https://api:443/api',  // 504
        // 'https://api:2443/api', // 504
        // //
        // 'santoral.api:443/api',             // CORS
        // 'santoral.api:2443/api',            // CORS
        // 'https://santoral.api:443/api',     // 504
        // 'https://santoral.api:2443/api',    // 504
        // //
        // 'https://192.168.1.119:443/api',    // 504
        // 'https://192.168.1.119:2443/api',   // 504
        // //
        // 'https://calendar-theedu.duckdns.org/api',  // Error
    ]

    constructor(private readonly http: HttpClient) {}

    public token(baseUrl: string): void {
        this.http.get(`${baseUrl}/token`).subscribe(console.log)
    }
}
