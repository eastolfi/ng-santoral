import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ImportService } from 'src/app/shared/services/import.service';

@Component({
    selector: 'snt-import',
    templateUrl: './import.component.html',
    styleUrls: ['./import.component.scss'],
})
export class ImportComponent {
    public form = this.fb.group({
        events: this.fb.control('', Validators.required)
    })

    @ViewChild('importDialog')
    private readonly importDialog!: ElementRef<HTMLDialogElement>;

    constructor(
        private readonly fb: FormBuilder,
        private readonly importService: ImportService,
    ) {}

    public openImportDialog(): void {
        this.importDialog.nativeElement.show();
    }

    public closeImportDialog(): void {
        this.form.reset();
        this.importDialog.nativeElement.close();
    }

    public importEvents(): void {
        this.importService.import(this.form.getRawValue().events as string)
    }
}
