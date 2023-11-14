import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild, computed, effect, signal } from '@angular/core';
import { environment } from '@frontend/envs/environment';
import { finalize } from 'rxjs';

@Component({
    selector: 'snt-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
    @ViewChild('selectFile')
    public selectFile!: ElementRef<HTMLInputElement>;

    public file = signal<File | undefined>(undefined)
    public disabled = computed(() => this.file() === undefined);

    constructor(private readonly http: HttpClient) {}

    public onFileSelected(e: Event) {
        const file = ((e.target as HTMLInputElement).files || [])[0];
        this.file.set(file);
    }

    public uploadFile() {
        const file = this.file() as File;

        const formData = new FormData();
        formData.append('file', file);

        const upload$ = this.http.post(`${environment.apiUrl}/import/from-file`, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            finalize(() => {
                this.file.set(undefined);
                this.selectFile.nativeElement.value = '';
            })
        );

        upload$.subscribe(event => {
            console.log(event);
        })
    }
}
