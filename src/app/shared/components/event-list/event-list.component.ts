import { Component, Input } from '@angular/core';

@Component({
    selector: 'snt-event-list',
    templateUrl: './event-list.component.html',
    styleUrls: ['./event-list.component.scss'],
})
export class EventListComponent {
    @Input()
    public set events(events: string[]) {
        this._events = events;
    }
    public get events() {
        return this._events;
    }
    private _events: string[] = [];

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
    public dayDescriptor = 'today';

    public get showEventOverflow(): boolean {
        return this._events.length > this._limit;
    }
}
