import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, of } from 'rxjs';
import { DateService } from '../../../shared/services/date.service';
import { Calendar, PersistanceService } from 'src/app/shared/services/persistance.service';
import { HttpClient } from '@angular/common/http';
import { Event } from '@prisma/client';

export type Day = {
    originalDate: Date;
    month: string;
    weekday: string;
    date: string;
    events: Pick<Event, 'id' | 'title'>[]
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

    constructor(
        private readonly dateService: DateService,
        private readonly persistanceService: PersistanceService,
        private readonly http: HttpClient,
    ) {
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
        return this.http.post('http://localhost:3030/events', {
            day: this.dateService.getDay(this.dateService.today),
            month: this.dateService.getMonthShort(this.dateService.today),
            title
        }).pipe(map(() => true))

        // return this.persistanceService.getUserData(this.user)
        // .pipe(
        //     map(({ events }: Calendar) => ({
        //         events: {
        //             ...events,
        //             [date]: [ ...(events[date] || []), title ]
        //         }
        //     })),
        //     mergeMap((updatedUserData: Calendar) => this.persistanceService.setUserData(this.user, updatedUserData))
        // )
    }

    public getEventsForDate(original: Date): Observable<Day> {
        return this.getEvents(this.user, original)
        .pipe(
            map((events: Pick<Event, 'id' | 'title'>[]) => ({
                originalDate: new Date(original),
                date: this.dateService.getDay(original),
                weekday: this.dateService.getWeekDate(original),
                month: this.dateService.getMonth(original),
                events
            } as Day))
        )
    }

    // public findAllEvents(): Observable<{ [user: string]: Calendar }> {
    //     return this.persistanceService.getData()
    //     .pipe(
    //         map(db => db.calendars),
    //     );
    // }

    private changeDate(newDate: Date): void {
        this.getEventsForDate(newDate).subscribe((date: Day) => {
            this.dateService.today = newDate;
            this.today$.next(date);
        });

        this.getEventsForDate(this.dateService.add(-1, newDate)).subscribe((date: Day) => {
            this.yesterday$.next(date);
        });

        this.getEventsForDate(this.dateService.add(1, newDate)).subscribe((date: Day) => {
            this.tomorrow$.next(date);
        });
    }

    private getEvents(user: string, date: Date): Observable<Pick<Event, 'id' | 'title'>[]> {
        return this.persistanceService.getUserData(user, date)
        .pipe(
            map((calendar: Calendar) =>
                calendar.events[this.persistanceService.getFormattedDate(date)] || [])
        )
    }
}
