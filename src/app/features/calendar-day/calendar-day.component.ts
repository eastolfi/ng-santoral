import { Component, OnDestroy, OnInit, signal, computed, Signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CalendarService, Day } from '../shared/services/calendar.service';
import { Subscription } from 'rxjs';
import { DateService } from 'src/app/shared/services/date.service';

@Component({
    selector: 'snt-calendar-day',
    templateUrl: './calendar-day.component.html',
    styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit, OnDestroy {
    public form = this.fb.group({
        event: this.fb.control('', Validators.required)
    })

    public get today(): Day {
        return this._today();
    }

    public get yesterday(): Day {
        return this._yesterday();
    }

    public get tomorrow(): Day {
        return this._tomorrow();
    }

    private _today = signal<Day>(this.calendarService.today$.value);
    private _yesterday = signal<Day>(this.calendarService.yesterday$.value);
    private _tomorrow = signal<Day>(this.calendarService.tomorrow$.value);
    private subscriptions: Subscription[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly calendarService: CalendarService,
    ) {
    }

    ngOnInit(): void {
        this.subscriptions.push(this.calendarService.today$.subscribe((date: Day) => {
            this._today.set(date);
        }));

        this.subscriptions.push(this.calendarService.yesterday$.subscribe((date: Day) => {
            this._yesterday.set(date);
        }));

        this.subscriptions.push(this.calendarService.tomorrow$.subscribe((date: Day) => {
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
}
