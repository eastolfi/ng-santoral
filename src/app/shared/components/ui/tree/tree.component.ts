import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TreeElement } from './tree';

@Component({
    selector: 'snt-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
})
export class TreeComponent {
    private _elements: TreeElement[] = [];

    @Input({ required: true })
    public set elements(elements: TreeElement[]) {
        this._elements = elements;
    }

    public get elements() {
        return this._elements;
    }

    @Output()
    public selected = new EventEmitter<string>();

    public selectedItems: Array<{ event: string, date: string, user: string }> = [];


    public onToggleItem2(event: TreeElement, e: Event) {
        const shouldAdd = (e.target as HTMLInputElement).checked;
        const isRoot = !event.parent;
        const isEvent = !event.children?.length;

        if (shouldAdd) {
            if (!isEvent) {
                if (isRoot) {
                    event.children!.forEach(dateEvent => {
                        if (!dateEvent.checked) {
                            dateEvent.checked = true;
                            dateEvent.children?.forEach(e => {
                                if (!e.checked) {
                                    e.checked = true;
                                    this.selectedItems.push({
                                        event: e.label,
                                        date: dateEvent.label,
                                        user: event.label,
                                    })
                                }
                            })
                        }
                    })
                } else {
                    event.children!.forEach(e => {
                        if (!e.checked) {
                            e.checked = true;
                            const userElement = this.findElementWithId(this._elements, event.parent);
                            this.selectedItems.push({
                                event: e.label,
                                date: event.label,
                                user: userElement.label,
                            })
                        }
                    })
                }
            }

            if (isEvent) {
                event.checked = true;
                const dateElement = this.findElementWithId(this._elements, event.parent);
                const userElement = this.findElementWithId(this._elements, dateElement.parent);
                this.selectedItems.push({
                    event: event.label,
                    date: dateElement.label,
                    user: userElement.label,
                })
            }
        } else {
            const clone = [...this.selectedItems];
            for (let i = 0; i < clone.length; i++) {
                const item = clone[i];

                if (item.event === event.label) {
                    if (!isEvent) {
                        //
                    } else {
                        //
                    }
                }
            }

            const i = this.selectedItems.findIndex(e => e.event === event.label);
            this.selectedItems.splice(i, 1);
        }

        console.log(this.selectedItems);
    }

    public onToggleItem(event: TreeElement, e: Event) {
        const shouldAdd = (e.target as HTMLInputElement).checked;
        const isRoot = !event.parent;
        const isEvent = !event.children?.length;

        const selectedIds: string[] = [];
        const addToSelectedIfNotPresent = (event: TreeElement) => {
            if (!event.checked) {
                event.checked = true;
                selectedIds.push(event.id);
            }
        }
        const addToSelectedWithChildrenIfNotPresent = (event: TreeElement) => {
            if (!event.checked) {
                if (event.children) {
                    event.checked = true;
                    event.children.forEach(e => addToSelectedWithChildrenIfNotPresent(e))
                } else {
                    addToSelectedIfNotPresent(event);
                }
            }
        }
        const buildSelectedElement = (eventId: string) => {
            const event = this.findElementWithId(this._elements, eventId);
            const date = this.findElementWithId(this._elements, event.parent);
            const user = this.findElementWithId(this._elements, date.parent);
            return {
                event: event.label,
                date: date.label,
                user: user.label,
            }
        }

        if (shouldAdd) {
            // Middle
            if (!isEvent && !isRoot) {
                addToSelectedWithChildrenIfNotPresent(event);
            }

            if (!isEvent && isRoot) {
                addToSelectedWithChildrenIfNotPresent(event);
            }
        }

        if (shouldAdd) {
            if (!isEvent) {
                if (isRoot) {
                    event.children!.forEach(dateEvent => {
                        if (!dateEvent.checked) {
                            dateEvent.checked = true;
                            dateEvent.children?.forEach(e => addToSelectedIfNotPresent(e))
                        }
                    })
                } else {
                    event.children!.forEach(e => addToSelectedIfNotPresent(e))
                }
            }

            if (isEvent) {
                addToSelectedIfNotPresent(event);
            }
        } else {
            const clone = [...this.selectedItems];
            for (let i = 0; i < clone.length; i++) {
                const item = clone[i];

                if (item.event === event.label) {
                    if (!isEvent) {
                        //
                    } else {
                        //
                    }
                }
            }

            const i = this.selectedItems.findIndex(e => e.event === event.label);
            this.selectedItems.splice(i, 1);
        }

        console.log(this.selectedItems);
    }

    private findElementWithId(elements: TreeElement[], id?: string): TreeElement {
        if (!id) {
            throw new Error();
        }

        let found = elements.find(e => e.id === id);

        if (!found) {
            for (let ele of elements) {
                if (ele.children) {
                    found = this.findElementWithId(ele.children, id);
                    if (found) {
                        break;
                    }
                }
            }
        }

        if (!found) {
            throw new Error();
        }

        return found;
    }
}
