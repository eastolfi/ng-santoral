import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'snt-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
    @Output()
    public click = new EventEmitter<void>();

    public doClick(): void {
        this.click.next();
    }
}
