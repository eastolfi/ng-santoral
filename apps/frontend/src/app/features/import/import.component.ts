import { Component, OnInit } from '@angular/core';
import { AvailableImports, ImportService } from './import.service';
import { CalendarService } from '@frontend/shared/services/calendar.service';

@Component({
    selector: 'snt-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
    public availableImports: AvailableImports[] = [];
    public eventsImported: undefined | number;

    private selection = "";

    constructor(
        private readonly importService: ImportService,
        private readonly calendarService: CalendarService,
    ) {}

    ngOnInit(): void {
        this.importService.getAvailableImports().subscribe(imports => this.availableImports = imports.data);
    }

    public onSelectionChanged(e: Event) {
        this.selection = (e.target as HTMLSelectElement).value;
    }

    public importEventes(): void {
        this.importService.importEvents(this.selection).subscribe(({ data }) => {
            this.eventsImported = data[0];
            this.calendarService.resetToday();
            // Clear message
            setTimeout(() => this.eventsImported = undefined, 3000);
        });
    }

    public get isValidSelection(): boolean {
        return !!this.selection;
    }
}
