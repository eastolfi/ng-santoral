import { Injectable } from '@angular/core';
import { Calendar, PersistanceService, SantoralDB } from './persistance.service';
import { Observable, map, mergeMap, tap } from 'rxjs';

@Injectable()
export class ImportService {
    private delimiter = ';';
    private user = 'eastolfi';

    constructor(
        private readonly persistanceService: PersistanceService,
    ) {}

    public import(content: string): Observable<boolean> {
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

        return this.persistanceService.getData()
        .pipe(
            map(({ version, calendars }: SantoralDB) => ({
                version,
                calendars: {
                    ...calendars,
                    [this.user]: events
                }
            }) as SantoralDB),
            mergeMap((updated: SantoralDB) => this.persistanceService.setData(updated)),
        )
    }
}
