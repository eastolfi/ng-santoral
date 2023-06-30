import { Component, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/features/shared/services/auth.service';
import { CalendarService } from 'src/app/features/shared/services/calendar.service';

@Component({
    selector: 'snt-add-event-dialog',
    templateUrl: './add-event-dialog.component.html',
    styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent implements OnDestroy {
    @ViewChild('addEventDialog')
    private readonly addEventDialog!: ElementRef<HTMLDialogElement>;

    public form = this.fb.group({
        event: this.fb.control('', Validators.required)
    });
    public isAuthorized = false;

    private subscriptions: Subscription[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly calendarService: CalendarService,
        private readonly authService: AuthService,
    ) {
        this.subscriptions.push(this.authService.isAuthorized$('Admin').subscribe(authorized => {
            this.isAuthorized = authorized;
        }))
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public get isConnected(): boolean {
        return this.authService.isConnected();
    }

    public openDialog(): void {
        this.addEventDialog.nativeElement.showModal();
    }

    public closeDialog(): void {
        this.form.reset();
        this.addEventDialog.nativeElement.close();
    }

    public addEvent(): void {
        this.calendarService.addEvent(this.form.getRawValue().event as string)
        .subscribe(() => {
            window.location.reload();
        })
    }
}
