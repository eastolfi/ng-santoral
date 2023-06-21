import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../../../shared/services/date.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

export type Day = {
    month: string;
    weekday: string;
    date: string;
    events: string[]
}

@Injectable()
export class CalendarService {
    public today$ = new BehaviorSubject<Day>({
        month: '--',
        weekday: '--',
        date: '--',
        events: []
    });

    constructor(private readonly dateService: DateService, private readonly persistanceService: PersistanceService) {
        this.changeDate(this.dateService.today);
    }

    public nextDay(): void {
        this.changeDate(this.dateService.add(1, this.dateService.today));
    }

    public previousDay(): void {
        this.changeDate(this.dateService.add(-1, this.dateService.today));
    }

    private changeDate(newDate: Date): void {
        this.convertDate(newDate).then(date => {
            this.dateService.today = newDate;
            this.today$.next(date);
        })
    }

    private async convertDate(original: Date): Promise<Day> {
        return await this.getEvents('eastolfi', original).then((events: string[]) => {
            return {
                date: this.dateService.getDay(original),
                weekday: this.dateService.getWeekDate(original),
                month: this.dateService.getMonth(original),
                events
            };
        })
    }

    private async getEvents(user: string, date: Date): Promise<string[]> {
        const db = await this.persistanceService.getData();

        const events = (db.calendars[user] || { events: {} }).events;

        return events[this.persistanceService.getFormattedDate(date)] || []
    }
}
