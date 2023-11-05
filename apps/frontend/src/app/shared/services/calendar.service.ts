import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, mergeMap, of, retry, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Event } from '@prisma/client';
import { User } from '@auth0/auth0-spa-js';

import { environment } from '@frontend/envs/environment';
import { DateService } from '@frontend/shared/services/date.service';
import { Calendar, PersistanceService } from '@frontend/shared/services/persistance.service';
import { AuthService } from '@frontend/shared/services/auth.service';

export type DayWithEvents = {
    originalDate: Date;
    month: string;
    weekday: string;
    date: string;
    events: Pick<Event, 'id' | 'title'>[]
}

const defaultDay: DayWithEvents = {
    originalDate: new Date(),
    month: '--',
    weekday: '--',
    date: '--',
    events: []
}

interface UserAuth0 extends User {
    ['santoral/email']: string;
    ['santoral/roles']: string[];
}

@Injectable()
export class CalendarService {
    public today$ = new BehaviorSubject<DayWithEvents>(defaultDay);
    public yesterday$ = new BehaviorSubject<DayWithEvents>(defaultDay);
    public tomorrow$ = new BehaviorSubject<DayWithEvents>(defaultDay);

    constructor(
        private readonly dateService: DateService,
        private readonly persistanceService: PersistanceService,
        private readonly http: HttpClient,
        private readonly auth: AuthService,
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
        return this.http.post(`${environment.apiUrl}/events`, {
            day: this.dateService.getDay(this.dateService.today),
            month: this.dateService.getMonthShort(this.dateService.today),
            title
        }).pipe(map(() => true))
    }

    private getEventsForDate(original: Date): Observable<DayWithEvents> {
        return this.auth.auth0.isAuthenticated$.pipe(
            mergeMap(connected => this.auth.auth0.user$.pipe(map(user => ({ connected, user: user as UserAuth0 })))),
            mergeMap(({ connected, user }) => {
                if (connected && user?.['santoral/email']) {
                    return of(user['santoral/email']);
                } else {
                    return throwError(() => new Error(`Can't find user information`))
                }
            }),
            retry({
                count: 1,
                delay: 1000,
            }),
            mergeMap(email => this.getEvents(email, original)),
            map((events: Pick<Event, 'id' | 'title'>[]) => ({
                originalDate: new Date(original),
                date: this.dateService.getDay(original),
                weekday: this.dateService.getWeekDate(original),
                month: this.dateService.getMonth(original),
                events
            } as DayWithEvents))
        )
    }

    private changeDate(newDate: Date): void {
        this.getEventsForDate(newDate).subscribe((date: DayWithEvents) => {
            this.dateService.today = newDate;
            this.today$.next(date);
        });

        this.getEventsForDate(this.dateService.add(-1, newDate)).subscribe((date: DayWithEvents) => {
            this.yesterday$.next(date);
        });

        this.getEventsForDate(this.dateService.add(1, newDate)).subscribe((date: DayWithEvents) => {
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
