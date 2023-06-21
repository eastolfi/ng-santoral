import { Injectable } from '@angular/core';
import { Calendar, PersistanceService } from './persistance.service';
// import { DateService } from './date.service';

@Injectable()
export class ImportService {
    private delimiter = ';';
    private user = 'eastolfi';

    constructor(
        private readonly persistanceService: PersistanceService,
        // private readonly dateService: DateService,
    ) {}

    public async import(content: string): Promise<void> {
        const lines = content.split('\n');
        const { events }: Calendar = { events: {} };
        lines
            .map(line => line.split(this.delimiter))
            .forEach(([ month, day, event ]) => {
                const date = month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
                if (!events[date]) {
                    events[date] = [];
                }

                events[date].push(event);
            });

        const db = await this.persistanceService.getData();
        (db.calendars[this.user] || { events: {} }).events = events;

        await this.persistanceService.setData(db);
    }
}
