import { Component, Input } from '@angular/core';
import { Event } from '@prisma/client';

@Component({
    selector: 'snt-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
    @Input()
    public set events(events: Pick<Event, 'id' | 'title'>[]) {
        this._events = events;
    }
    public get events() {
        return this._events;
    }
    private _events: Pick<Event, 'id' | 'title'>[] = [];

    @Input()
    public set limit(limit: number) {
        this._limit = limit;
    };
    public get limit() {
        return this._limit;
    }
    private _limit = 0;

    @Input()
    public allowAddEvent = false;

    @Input()
    public allowRemoveEvent = false;

    @Input()
    public dayDescriptor = 'today';

    public get showEventOverflow(): boolean {
        return this._events.length > this._limit;
    }

    public get eventsShown(): Pick<Event, 'id' | 'title'>[] {
        return this.showEventOverflow ? this.events.slice(0, this.limit) : this.events;
    }

    public get eventsExtra(): Pick<Event, 'id' | 'title'>[] {
        return this.showEventOverflow ? this.events.slice(this.limit, this.events.length) : [];
    }
}
