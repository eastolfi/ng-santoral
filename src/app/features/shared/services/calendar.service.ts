import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DateService } from '../../../shared/services/date.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';

export type Day = {
    originalDate: Date;
    month: string;
    weekday: string;
    date: string;
    events: string[]
}

const defaultDay: Day = {
    originalDate: new Date(),
    month: '--',
    weekday: '--',
    date: '--',
    events: []
}

@Injectable()
export class CalendarService {
    public today$ = new BehaviorSubject<Day>(defaultDay);
    public yesterday$ = new BehaviorSubject<Day>(defaultDay);
    public tomorrow$ = new BehaviorSubject<Day>(defaultDay);

    private user = 'eastolfi';

    constructor(private readonly dateService: DateService, private readonly persistanceService: PersistanceService) {
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

    public async addEvent(title: string): Promise<void> {
        const db = await this.persistanceService.getData();
        const userDb = await this.persistanceService.getUserData(this.user, db);
        const events = userDb.events;

        const date = this.persistanceService.getFormattedDate(this.dateService.today);
        if (!events[date]) {
            events[date] = [];
        }
        events[date].push(title);

        db.calendars[this.user].events = events;
        this.persistanceService.setData(db);
    }

    public async mapDateToDay(original: Date): Promise<Day> {
        return await this.getEvents(this.user, original).then((events: string[]) => {
            return {
                originalDate: new Date(original),
                date: this.dateService.getDay(original),
                weekday: this.dateService.getWeekDate(original),
                month: this.dateService.getMonth(original),
                events
            } as Day;
        })
    }

    private changeDate(newDate: Date): void {
        this.mapDateToDay(newDate).then((date: Day) => {
            this.dateService.today = newDate;
            this.today$.next(date);
        });

        this.mapDateToDay(this.dateService.add(-1, this.dateService.today)).then((date: Day) => {
            this.yesterday$.next(date);
        });

        this.mapDateToDay(this.dateService.add(1, this.dateService.today)).then((date: Day) => {
            this.tomorrow$.next(date);
        });
    }

    private async getEvents(user: string, date: Date): Promise<string[]> {
        const db = await this.persistanceService.getUserData(user);
        const events = db.events;

        const d = this.persistanceService.getFormattedDate(date);
        const e = events[d]
        return e || []
    }
}
