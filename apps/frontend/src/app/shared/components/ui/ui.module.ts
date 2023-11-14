import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { DialogComponent } from './dialog/dialog.component';
import { BottomNavigationModule } from './bottom-navigation/bottom-navigation.module';
import { FileUploadModule } from './file-upload/file-upload.module';

// import { TreeComponent } from './tree/tree.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        BottomNavigationModule,
        FileUploadModule,
    ],
    exports: [
        BottomNavigationModule,
        FileUploadModule,
    ]
})
export class UiModule {}
