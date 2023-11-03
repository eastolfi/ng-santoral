import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { ImportService } from './import.service';

@NgModule({
    declarations: [ImportComponent],
    imports: [CommonModule, ImportRoutingModule],
    providers: [ImportService]
})
export class ImportModule {}
