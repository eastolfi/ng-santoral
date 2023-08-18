import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, defaultIfEmpty, map, of, tap } from 'rxjs';
import { Event } from '@prisma/client';

import { DateService } from './date.service';

export type Calendar = {
    events: {
        [date: string]: string[]
    }
};


@Injectable()
export class PersistanceService {
    private defaultCalendar: Calendar = {
        events: {}
    }

    constructor(
        private readonly dateService: DateService,
        private readonly http: HttpClient,
    ) {}

    private findEventsForUser(username: string, date: Date): Observable<Event[]> {
        return this.http.get<Event[]>(`${this.baseUrl}/events?username=${username}&date=${this.getFormattedDate(date)}`)
            .pipe(tap(events => console.log(`Events for ${date}: ${events.length}`)));
    }

    public getUserData(user: string, date: Date): Observable<Calendar> {
        type EventsForCalendar = { [date: string]: Pick<Event, 'id' | 'title'>[] };

        return this.findEventsForUser(user, date).pipe(
            map((events: Event[]) => events
                .map(({ id, title, day, month }: Event) => ({ date: `${month}${day}`, title, id }))
                .reduce((previous: EventsForCalendar, { id, date, title }: { id:number, date: string, title: string }) => {
                    if (!previous[date]) {
                        previous[date] = [];
                    }
                    previous[date].push({ id, title });
                    return previous;
                }, {} as EventsForCalendar)),
            map(events => ({ events })),
            // tap(this.cacheData),
            defaultIfEmpty(this.defaultCalendar),
            catchError(error => {
                console.error('Error while fetching user data');
                console.error(error);
                return of(this.defaultCalendar);
            })
        );
    }

    private static cache: SantoralDB | null = null;
    public getData(): Observable<SantoralDB> {
        if (this.hasCache()) {
            return of(this.getCachedData());
        }

        return this.fetchData();
    }

    private hasCache(): boolean {
        return PersistanceService.cache != null || !!localStorage.getItem('db');
    }
    private getCachedData(): SantoralDB {
        let db = PersistanceService.cache;

        if (!db) {
            db = JSON.parse(localStorage.getItem('db')!);
        }

        return db!;
    }
    private cacheData(db: SantoralDB): void {
        PersistanceService.cache = db;
        localStorage.setItem('db', JSON.stringify(db));
    }
    public invalidateCache(): void {
        PersistanceService.cache = null;
        localStorage.removeItem('db');
    }


    public getFormattedDate(date: Date): string {
        return `${this.dateService.getMonthShort(date)}${this.dateService.getDay(date)}`;
    }
}
