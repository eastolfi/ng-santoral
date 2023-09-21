import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, defaultIfEmpty, filter, from, map, mergeMap, of, tap } from 'rxjs';

import { DateService } from './date.service';
import { Event } from '@prisma/client';

const org = 'v1';
const project = 'Santoral';
const ID_FIELD = 'Id';

type CalendarLight = {
    Id: number,
    name: string,
}
type User = {
    CreatedAt: string, // 2023-08-23 11:57:50
    Id: number,
    UpdatedAt: string, // 2023-08-23 11:57:50
    calendars: CalendarLight[],
    email: string,
    full_name: string,
    username: string,
}

type Version = string;
export type SantoralDB = {
    version: Version;
    calendars: {
        [user: string]: Calendar;
    };
};
export type Calendar = {
    events: {
        [date: string]: Pick<Event, 'id' | 'title'>[]
    }
};

type GithubGist = {
    content: string;
}
type GithubGistResponse = {
    files: {
        [filename: string]: GithubGist
    }
}

@Injectable()
export class PersistanceService {
    private baseUrl = import.meta.env.NG_APP_API_BASE_URL;

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
        // const user = await this.nocoService.instance.dbTableRow
        //     .findOne(org, project, 'users', {
        //         where: `where=(username,eq,${username})`,
        //         fields: ['nested[calendars][fields]=*']
        //     }) as User;

        // const calendar = await this.nocoService.instance.dbTableRow
        //     .findOne(org, project, 'calendars', {
        //         where: `where=(owner.Id,eq, patata)`
        //     })
        // console.log(events)

        // return of();
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
        //     map((events: Event[]) => events.reduce((a: Event, b: { [date: string]: Event }) => {
        //         return {
        //             'date': a
        //         };
        //     }), {})
        //     // map((events: Event[]) => events.map(({ title, day, month }) => ({
        //     //     date: `${month}${day}`,
        //     //     title
        //     // })).map(events => {

        //     // })
        // );

        // this.nocoService.instance.dbTableRow.nestedList(org, project, 'users', )
        // from(this.nocoService.instance.dbTableRow
        //     .findOne(org, project, 'users', {
        //         where: `where=(username,eq,eastolfi)`
        //     })).pipe(
        //         map(data => data as User),
        //         // mergeMap(data => )
        //     )
        // return this.getData().pipe(
        //     map(db => db.calendars),
        //     filter(calendars => !!calendars[user]),
        //     map(calendars => calendars[user]),
        //     defaultIfEmpty(this.defaultCalendar),
        //     catchError(error => {
        //         console.error('Error while fetching user data');
        //         console.error(error);
        //         return of(this.defaultCalendar);
        //     })
        // );
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

    //     if (!db) {
    //         db = JSON.parse(localStorage.getItem('db')!);
    //     }

    //     return db!;
    // }
    // private cacheData(db: SantoralDB): void {
    //     PersistanceService.cache = db;
    //     localStorage.setItem('db', JSON.stringify(db));
    // }
    // public invalidateCache(): void {
    //     PersistanceService.cache = null;
    //     localStorage.removeItem('db');
    // }

    // public setData(data: SantoralDB): Observable<boolean> {
    //     return this.http.patch(`https://api.github.com/gists/${import.meta.env.NG_APP_GIST_ID}`,
    //     JSON.stringify({
    //         files: {
    //             [import.meta.env.NG_APP_GIST_NAME]: {
    //                 content: JSON.stringify(data),
    //             },
    //         },
    //     }), {
    //         headers: {
    //             Authorization: `Bearer ${import.meta.env.NG_APP_GIST_TOKEN}`,
    //         }
    //     }).pipe(
    //         map(() => true),
    //         tap(() => this.invalidateCache())
    //     );
    // }

    // public setUserData(user: string, data: Calendar): Observable<boolean> {
    //     return this.getData()
    //     .pipe(
    //         map((db: SantoralDB) => {
    //             db.calendars[user].events = data.events;
    //             return db;
    //         }),
    //         mergeMap((db) => this.setData(db))
    //     )
    // }

    public getFormattedDate(date: Date): string {
        return `${this.dateService.getMonthShort(date)}${this.dateService.getDay(date)}`;
    }

    // private fetchData(): Observable<SantoralDB> {
    //     return this.http.get<GithubGistResponse>(`https://api.github.com/gists/${import.meta.env.NG_APP_GIST_ID}`)
    //         .pipe(
    //             map((gist: GithubGistResponse) => gist.files),
    //             map(files => files[import.meta.env.NG_APP_GIST_NAME]),
    //             map(file => JSON.parse(file.content) as SantoralDB),
    //             tap(this.cacheData),
    //         )
    // }
}
