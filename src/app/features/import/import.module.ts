import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { ImportService } from 'src/app/shared/services/import.service';

@NgModule({
    declarations: [ImportComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ImportRoutingModule
    ],
    providers: [
        ImportService
    ]
})
export class ImportModule {}
