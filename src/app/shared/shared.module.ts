import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DateService } from './services/date.service';
import { PersistanceService } from './services/persistance.service';
import { EventListComponent } from './components/event-list/event-list.component';
import { AddEventDialogComponent } from './components/add-event-dialog/add-event-dialog.component';
import { UiModule } from './components/ui/ui.module';

const components = [
    EventListComponent,
    AddEventDialogComponent,
]

@NgModule({
    declarations: [...components],
    imports: [CommonModule, ReactiveFormsModule, UiModule],
    providers: [DateService, PersistanceService],
    exports: [...components, UiModule]
})
export class SharedModule {}
