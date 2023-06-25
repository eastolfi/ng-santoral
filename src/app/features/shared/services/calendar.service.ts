import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap } from 'rxjs';
import { DateService } from '../../../shared/services/date.service';
import { Calendar, PersistanceService } from 'src/app/shared/services/persistance.service';

export type Day = {
    originalDate: Date;
    month: string;
    weekday: string;
    date: string;
    events: string[]
}

const defaultDay: Day = {
    originalDate: new Date(),
    month: '--',
    weekday: '--',
    date: '--',
    events: []
}

@Injectable()
export class CalendarService {
    public today$ = new BehaviorSubject<Day>(defaultDay);
    public yesterday$ = new BehaviorSubject<Day>(defaultDay);
    public tomorrow$ = new BehaviorSubject<Day>(defaultDay);

    private user = 'eastolfi';

    constructor(private readonly dateService: DateService, private readonly persistanceService: PersistanceService) {
        this.changeDate(this.dateService.today);
    }

    public nextDay(): void {
        this.changeDate(this.dateService.add(1, this.dateService.today));
    }

    public previousDay(): void {
        this.changeDate(this.dateService.add(-1, this.dateService.today));
    }

    public resetToday(): void {
        this.changeDate(new Date());
    }

    public navigateToDate(date: Date): void {
        this.changeDate(date);
    }

    public addEvent(title: string): Observable<boolean> {
        const date = this.persistanceService.getFormattedDate(this.dateService.today);

        return this.persistanceService.getUserData(this.user)
        .pipe(
            map(({ events }: Calendar) => ({
                events: {
                    ...events,
                    [date]: [ ...(events[date] || []), title ]
                }
            })),
            mergeMap((updatedUserData: Calendar) => this.persistanceService.setUserData(this.user, updatedUserData))
        )
    }

    public mapDateToDay(original: Date): Observable<Day> {
        return this.getEvents(this.user, original)
        .pipe(
            map((events: string[]) => ({
                originalDate: new Date(original),
                date: this.dateService.getDay(original),
                weekday: this.dateService.getWeekDate(original),
                month: this.dateService.getMonth(original),
                events
            } as Day))
        )
    }

    private changeDate(newDate: Date): void {
        this.mapDateToDay(newDate).subscribe((date: Day) => {
            this.dateService.today = newDate;
            this.today$.next(date);
        });

        this.mapDateToDay(this.dateService.add(-1, this.dateService.today)).subscribe((date: Day) => {
            this.yesterday$.next(date);
        });

        this.mapDateToDay(this.dateService.add(1, this.dateService.today)).subscribe((date: Day) => {
            this.tomorrow$.next(date);
        });
    }

    private getEvents(user: string, date: Date): Observable<string[]> {
        return this.persistanceService.getUserData(user)
        .pipe(
            map((calendar: Calendar) =>
                calendar.events[this.persistanceService.getFormattedDate(date)] || [])
        )
    }
}
