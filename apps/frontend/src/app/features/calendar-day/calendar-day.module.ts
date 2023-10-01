import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CalendarService } from '@frontend/shared/services/calendar.service';
import { SharedModule } from '@frontend/shared/shared.module';

import { CalendarDayRoutingModule } from './calendar-day-routing.module';
import { CalendarDayComponent } from './calendar-day.component';

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
