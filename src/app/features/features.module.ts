import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarDayComponent } from './calendar-day/calendar-day.component';
import { CalendarService } from './shared/services/calendar.service';
import { SharedModule } from '../shared/shared.module';

const components = [CalendarDayComponent];

@NgModule({
    declarations: [...components],
    imports: [CommonModule, SharedModule],
    providers: [CalendarService],
    exports: [...components],
})
export class FeaturesModule {}
