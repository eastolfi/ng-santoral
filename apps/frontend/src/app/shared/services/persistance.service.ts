import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, defaultIfEmpty, map, of, tap } from 'rxjs';
import { Event } from '@prisma/client';

import { DateService, ToastService } from './date.service';
import { environment } from '../../../environments/environment';

export type Calendar = {
    events: {
        [date: string]: Pick<Event, 'id' | 'title'>[]
    }
};

type PrismaOrder = { [field: string]: 'asc' | 'desc' };
type ApiResponse<M> = {
    data: M[];
    totalRecords: number;
    pageCount: number;
    page: number;
    pageSize: number;
    orderBy: PrismaOrder[];
}

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
        const query = {
            where: {
                calendars: {
                    some: {
                        calendar: {
                            owner: {
                                name: {
                                    equals: username
                                }
                            }
                        }
                    }
                },
                day: this.dateService.getDay(date),
                month: this.dateService.getMonthShort(date)
            }
        }
        // return this.http.get<Event[]>(`${environment.apiUrl}/events?username=${username}&date=${this.getFormattedDate(date)}`)
        return this.http.get<ApiResponse<Event>>(`${environment.apiUrl}/events?${new URLSearchParams({ crudQuery: JSON.stringify(query) })}`)
            .pipe(tap(({ totalRecords }) => console.log(`Events for ${date}: ${totalRecords}`)), map(({ data }) => data));
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
            tap(events => ToastService.messages.push(`Fetched ${(Object.values(events)[0] || []).length} events`)),
            map(events => ({ events })),
            // tap(this.cacheData),
            defaultIfEmpty(this.defaultCalendar),
            catchError(error => {
                console.error('Error while fetching user data');
                console.error(error);
                ToastService.messages.push(error.message);
                return of(this.defaultCalendar);
            })
        );
    }

    // private static cache: SantoralDB | null = null;
    // public getData(): Observable<SantoralDB> {
    //     if (this.hasCache()) {
    //         return of(this.getCachedData());
    //     }

    //     return this.fetchData();
    // }

    // private hasCache(): boolean {
    //     return PersistanceService.cache != null || !!localStorage.getItem('db');
    // }
    // private getCachedData(): SantoralDB {
    //     let db = PersistanceService.cache;


    public getFormattedDate(date: Date): string {
        return `${this.dateService.getMonthShort(date)}${this.dateService.getDay(date)}`;
    }
}
