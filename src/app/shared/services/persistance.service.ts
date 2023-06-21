import { Injectable } from '@angular/core';
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

@Injectable()
export class PersistanceService {
    constructor(private readonly dateService: DateService) {}

    // TODO: Cache
    public async getUserData(user: string, db?: SantoralDB): Promise<Calendar> {
        let userDb;

        try {
            userDb = db || await this.getData();
        } catch (error) {
            console.error('Error while fetching user data');
            console.error(error);

            userDb = {
                version: '-.-.-',
                calendars: {
                    [user]: {
                        events: {
                            [this.getFormattedDate(this.dateService.today)]: [ 'Error while obtaining the events.' ]
                        }
                    }
                }
            }
        }

        return userDb.calendars[user] || { events: {} };
    }

    public async getData(): Promise<SantoralDB> {
        const req = await fetch(`https://api.github.com/gists/${import.meta.env['NG_APP_GIST_ID']}`);
        const gist = await req.json();
        return JSON.parse(gist.files[import.meta.env['NG_APP_GIST_NAME']].content);
    }

    public async setData(data: SantoralDB): Promise<void> {
        const req = await fetch(`https://api.github.com/gists/${import.meta.env['NG_APP_GIST_ID']}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${import.meta.env['NG_APP_GIST_TOKEN']}`,
            },
            body: JSON.stringify({
                files: {
                    [import.meta.env['NG_APP_GIST_NAME']]: {
                        content: JSON.stringify(data),
                    },
                },
            }),
        });

        return req.json();
    }

    public getFormattedDate(date: Date): string {
        return `${this.dateService.getMonthShort(date)}${this.dateService.getDay(date)}`;
    }
}
