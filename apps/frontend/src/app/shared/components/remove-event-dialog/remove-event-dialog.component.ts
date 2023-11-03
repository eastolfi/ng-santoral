import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '@frontend/shared/services/auth.service';
import { environment } from '@frontend/envs/environment';
import { CalendarService } from '@frontend/shared/services/calendar.service';

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
        private readonly calendarService: CalendarService,
    ) {
        this.subscriptions.push(this.authService.isAuthorized$('Admin').subscribe(authorized => {
            this.isAuthorized = authorized;
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public deleteEvent() {
        if (confirm('Are you sure?')) {
            this.http.delete(`${environment.apiUrl}/events/${this.eventId}`)
                .subscribe(() => this.calendarService.navigateToDate(this.calendarService.today$.value.originalDate));
        }
    }
}
