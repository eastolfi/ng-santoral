import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from './services/date.service';
import { PersistanceService } from './services/persistance.service';

@NgModule({
    declarations: [],
    imports: [CommonModule],
    providers: [DateService, PersistanceService],
})
export class SharedModule {}
