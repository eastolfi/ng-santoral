import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { DialogComponent } from './dialog/dialog.component';
import { BottomNavigationModule } from './bottom-navigation/bottom-navigation.module';
// import { TreeComponent } from './tree/tree.component';

const components: any[] = [
    // DialogComponent,
    // TreeComponent,
];

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        BottomNavigationModule,
    ],
    exports: [
        ...components,
        BottomNavigationModule,
    ]
})
export class UiModule {}
