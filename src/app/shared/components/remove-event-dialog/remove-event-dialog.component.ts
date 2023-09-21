import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/features/shared/services/auth.service';

@Component({
    selector: 'snt-remove-event-dialog',
    templateUrl: './remove-event-dialog.component.html',
    styleUrls: ['./remove-event-dialog.component.scss'],
})
export class RemoveEventDialogComponent implements OnDestroy {
    @Input({ required: true })
    public eventId!: number;

    public isAuthorized = false;

    private subscriptions: Subscription[] = [];

    constructor(
        private readonly http: HttpClient,
        private readonly authService: AuthService,
    ) {
        this.subscriptions.push(this.authService.isAuthorized$('Admin').subscribe(authorized => {
            this.isAuthorized = authorized;
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public deleteEvent() {
        this.http.delete(`${import.meta.env.NG_APP_API_BASE_URL}/events/${this.eventId}`)
            .subscribe(() => window.location.reload());
    }
}
