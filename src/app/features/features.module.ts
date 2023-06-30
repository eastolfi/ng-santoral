import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarService } from './shared/services/calendar.service';
import { SharedModule } from '../shared/shared.module';
import { ImportComponent } from './import/import.component';
import { ImportService } from '../shared/services/import.service';

const components = [
    CalendarDayComponent,
    ImportComponent,
];

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [CalendarService, ImportService],
    exports: [...components],
})
export class FeaturesModule {}
