import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportRoutingModule } from './import-routing.module';
import { ImportComponent } from './import.component';
import { ImportService } from './import.service';
import { UiModule } from '@frontend/shared/components/ui/ui.module';

@NgModule({
    declarations: [ImportComponent],
    imports: [CommonModule, ImportRoutingModule, UiModule],
    providers: [ImportService]
})
export class ImportModule {}
