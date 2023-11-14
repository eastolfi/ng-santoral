import { Component, OnDestroy, OnInit, signal, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CalendarService, DayWithEvents } from '@frontend/shared/services/calendar.service';
// import { DateService } from '../../shared/services/date.service';

@Component({
    selector: 'snt-calendar-day',
    templateUrl: './calendar-day.component.html',
    styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit, OnDestroy {
    public get today(): DayWithEvents {
        return this._today();
    }

    public get yesterday(): DayWithEvents {
        return this._yesterday();
    }

    public get tomorrow(): DayWithEvents {
        return this._tomorrow();
    }

    private _today = signal<DayWithEvents>(this.calendarService.today$.value);
    private _yesterday = signal<DayWithEvents>(this.calendarService.yesterday$.value);
    private _tomorrow = signal<DayWithEvents>(this.calendarService.tomorrow$.value);
    private subscriptions: Subscription[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly calendarService: CalendarService,
    ) {
        this.calendarService.resetToday();
    }

    ngOnInit(): void {
        this.subscriptions.push(this.calendarService.today$.subscribe((date: DayWithEvents) => {
            this._today.set(date);
        }));

        this.subscriptions.push(this.calendarService.yesterday$.subscribe((date: DayWithEvents) => {
            this._yesterday.set(date);
        }));

        this.subscriptions.push(this.calendarService.tomorrow$.subscribe((date: DayWithEvents) => {
            this._tomorrow.set(date);
        }));
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(s => s.unsubscribe());
    }

    public requestNextDay(): void {
        this.calendarService.nextDay();
    }

    public requestPreviousDay(): void {
        this.calendarService.previousDay();
    }

    public goToToday(): void {
        this.calendarService.resetToday();
    }

    @ViewChild('pickDateDialog')
    private readonly pickDateDialog!: ElementRef<HTMLDialogElement>;
    public form = this.fb.group({
        date: this.fb.control(null, Validators.required)
    });
    public openDialog(): void {
        this.pickDateDialog.nativeElement.showModal();
    }

    public closeDialog(): void {
        this.form.reset();
        this.pickDateDialog.nativeElement.close();
    }

    public pickDate(): void {
        const value = this.form.getRawValue().date;
        if (value) {
            this.calendarService.navigateToDate(new Date(value));
            this.pickDateDialog.nativeElement.close();
        }
    }
}
