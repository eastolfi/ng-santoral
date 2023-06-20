import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CalendarService, Day } from '../shared/services/calendar.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'snt-calendar-day',
    templateUrl: './calendar-day.component.html',
    styleUrls: ['./calendar-day.component.scss'],
})
export class CalendarDayComponent implements OnInit, OnDestroy {
    public get today(): Day {
        return this._today();
    }

    private _today = signal<Day>(this.calendarService.today$.value);
    private subscriptions: Subscription[] = [];

    constructor(private readonly calendarService: CalendarService) {}

    ngOnInit(): void {
        this.subscriptions.push(this.calendarService.today$.subscribe((date: Day) => {
            this._today.set(date);
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
}
