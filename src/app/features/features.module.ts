import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FeaturesRoutingModule } from './features-routing.module';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        FeaturesRoutingModule,
    ],
    exports: [],
})
export class FeaturesModule {}
