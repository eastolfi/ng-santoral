import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { DialogComponent } from './dialog/dialog.component';
import { BottomNavigationModule } from './bottom-navigation/bottom-navigation.module';
import { TreeModule } from './tree/tree.module';

const components: any[] = [
    // DialogComponent,
];

@NgModule({
    declarations: [...components],
    imports: [
        CommonModule,
        BottomNavigationModule,
        TreeModule,
    ],
    exports: [
        ...components,
        BottomNavigationModule,
        TreeModule,
    ]
})
export class UiModule {}
