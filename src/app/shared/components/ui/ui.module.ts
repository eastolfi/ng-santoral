import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { DialogComponent } from './dialog/dialog.component';
import { ButtonComponent } from './button/button.component';

const components = [
    // DialogComponent,
    ButtonComponent,
];

@NgModule({
    declarations: [...components],
    imports: [CommonModule],
    exports: [...components]
})
export class UiModule {}
