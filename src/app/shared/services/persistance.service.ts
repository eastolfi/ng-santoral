import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, defaultIfEmpty, filter, map, mergeMap, of, tap } from 'rxjs';
import { DateService } from './date.service';

type Version = string;
export type SantoralDB = {
    version: Version;
    calendars: {
        [user: string]: Calendar;
    };
};
export type Calendar = {
    events: {
        [date: string]: string[]
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
    private defaultCalendar: Calendar = {
        events: {}
    }

    constructor(private readonly dateService: DateService, private readonly http: HttpClient) {}

    public getUserData(user: string): Observable<Calendar> {
        return this.getData().pipe(
            map(db => db.calendars),
            filter(calendars => !!calendars[user]),
            map(calendars => calendars[user]),
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

    public setData(data: SantoralDB): Observable<boolean> {
        return this.http.patch(`https://api.github.com/gists/${import.meta.env['NG_APP_GIST_ID']}`,
        JSON.stringify({
            files: {
                [import.meta.env['NG_APP_GIST_NAME']]: {
                    content: JSON.stringify(data),
                },
            },
        }), {
            headers: {
                Authorization: `Bearer ${import.meta.env['NG_APP_GIST_TOKEN']}`,
            }
        }).pipe(
            map(() => true),
            tap(() => this.invalidateCache())
        );
    }

    public setUserData(user: string, data: Calendar): Observable<boolean> {
        return this.getData()
        .pipe(
            map((db: SantoralDB) => {
                db.calendars[user].events = data.events;
                return db;
            }),
            mergeMap((db) => this.setData(db))
        )
    }

    public getFormattedDate(date: Date): string {
        return `${this.dateService.getMonthShort(date)}${this.dateService.getDay(date)}`;
    }

    private fetchData(): Observable<SantoralDB> {
        return this.http.get<GithubGistResponse>(`https://api.github.com/gists/${import.meta.env['NG_APP_GIST_ID']}`)
            .pipe(
                map((gist: GithubGistResponse) => gist.files),
                map(files => files[import.meta.env['NG_APP_GIST_NAME']]),
                map(file => JSON.parse(file.content) as SantoralDB),
                tap(this.cacheData),
            )
    }
}
