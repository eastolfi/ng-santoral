import { Component } from '@angular/core';
import { TreeElement } from 'src/app/shared/components/ui/tree/tree';
import { CalendarService } from '../shared/services/calendar.service';
import { Calendar } from 'src/app/shared/services/persistance.service';

function uuidv4(): string {
    return `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(
        /[018]/g,
        (c: string) =>
            (
                parseInt(c) ^
                (crypto.getRandomValues(new Uint8Array(1))[0] &
                    (15 >> (parseInt(c) / 4)))
            ).toString(16)
    );
}

@Component({
    selector: 'snt-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
    public elements: TreeElement[] = [];

    constructor(private readonly calendarService: CalendarService) {
        this.calendarService.findAllEvents()
            .subscribe(calendars => this.elements = this.generateTree(calendars))
    }

    public onSelected(event: string) {
        console.log(event);
    }

    private generateTreeForEvent(event: string, parendId: string): TreeElement {
        return {
            id: uuidv4(),
            label: event,
            parent: parendId,
        }
    }
    private generateTreeForDay(day: string, parendId: string): TreeElement {
        return {
            id: uuidv4(),
            label: day,
            parent: parendId,
            children: [],
        }
    }
    private generateTreeForCalendar(calendar: Calendar, parendId: string): TreeElement[] {
        return Object.entries(calendar.events).map(([date, events]) => {
            const day = this.generateTreeForDay(date, parendId);
            day.children = events.map(event => this.generateTreeForEvent(event, day.id));

            return day;
        })
    }
    private generateTreeForUser(user: string, calendar: Calendar): TreeElement {
        const id = uuidv4();
        return {
            id,
            label: user,
            children: this.generateTreeForCalendar(calendar, id)
        }
    }
    private generateTree(calendars: { [user: string]: Calendar }): TreeElement[] {
        const c = Object.entries(calendars).map(([ user, calendar ]) => this.generateTreeForUser(user, calendar))

        console.log(c);
        return c;
        // return [
        //     {
        //         id: uuidv4(),
        //         label: 'views',
        //         children: [
        //             { id: uuidv4(), label: 'index.html' },
        //             {
        //                 id: uuidv4(),
        //                 label: 'layout',
        //                 children: [
        //                     {
        //                         id: uuidv4(),
        //                         label: 'base',
        //                         children: [{ id: uuidv4(), label: 'index.html' }],
        //                     },
        //                     {
        //                         id: uuidv4(),
        //                         label: 'footer',
        //                         children: [{ id: uuidv4(), label: 'index.html' }],
        //                     },
        //                 ],
        //             },
        //         ],
        //     },
        // ];
    }
}
