import { Injectable } from '@angular/core';
import { DateService } from './date.service';

// const TOKEN = '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';
// const GIST_ID = '0b12d9e46949d577eff7cbec57a97c3e';
// const GIST_FILENAME = 'santoral_db.json';

type Version = string;
export type SantoralDB = {
    version: Version;
    calendars: {
        [user: string]: Calendar;
    };
};
type Calendar = {
    events: {
        [date: string]: string[]
    }
};

@Injectable()
export class PersistanceService {
    constructor(private readonly dateService: DateService) {}

    public async getData(): Promise<SantoralDB> {
        const req = await fetch(`https://api.github.com/gists/${import.meta.env['NG_APP_GIST_ID']}`);
        const gist = await req.json();
        return JSON.parse(gist.files[import.meta.env['NG_APP_GIST_NAME']].content);
    }

    public async getEvents(user: string, date: Date): Promise<string[]> {
        const db = await this.getData();

        const events = (db.calendars[user] || { events: {} }).events;

        return events[this.dateService.format(date)] || []
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
}
