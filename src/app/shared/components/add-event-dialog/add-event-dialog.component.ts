import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarService } from 'src/app/features/shared/services/calendar.service';

@Component({
    selector: 'snt-add-event-dialog',
    templateUrl: './add-event-dialog.component.html',
    styleUrls: ['./add-event-dialog.component.scss'],
})
export class AddEventDialogComponent {
    @ViewChild('addEventDialog')
    private readonly addEventDialog!: ElementRef<HTMLDialogElement>;

    public form = this.fb.group({
        event: this.fb.control('', Validators.required)
    });

    constructor(
        private readonly fb: FormBuilder,
        private readonly calendarService: CalendarService,
    ) {}

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
