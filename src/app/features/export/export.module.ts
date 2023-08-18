import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiModule } from 'src/app/shared/components/ui/ui.module';
import { ExportRoutingModule } from './export-routing.module';
import { ExportComponent } from './export.component';
import { CalendarService } from '../shared/services/calendar.service';

@NgModule({
    declarations: [ExportComponent],
    imports: [
        CommonModule,
        UiModule,
        ExportRoutingModule
    ],
    providers: [
        CalendarService
    ]
})
export class ExportModule {}
