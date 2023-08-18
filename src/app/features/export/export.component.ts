import { Component } from '@angular/core';
import { CalendarService } from '../shared/services/calendar.service';


@Component({
    selector: 'snt-export',
    templateUrl: './export.component.html',
    styleUrls: ['./export.component.scss'],
})
export class ExportComponent {
    constructor(private readonly calendarService: CalendarService) {
    }
}
