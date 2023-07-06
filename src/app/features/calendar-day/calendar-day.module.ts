import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarDayRoutingModule } from './calendar-day-routing.module';
import { CalendarDayComponent } from './calendar-day.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarService } from '../shared/services/calendar.service';

@NgModule({
    declarations: [CalendarDayComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        CalendarDayRoutingModule,
    ],
    providers: [CalendarService],
    exports: [],
})
export class CalendarDayModule {}
