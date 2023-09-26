import { Component, Input, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';

export class BottomNavigationConfig {
    public items: BottomNavigationItem[] = [];

    public reload(): void {
        this.items = this.items.map(item => {
            item.shouldShow = item.displaySignal!();
            return item;
        });
    }
}

type CallableAction = () => void;
export type BottomNavigationItem = {
    label: string | Signal<string>;
    icon: string;
    action: string | CallableAction;
    shouldShow?: boolean;
    displaySignal?: Signal<boolean>;
}

class BottomNavigationBuilder {
    private items: BottomNavigationItem[] = [];

    public addItem(item: BottomNavigationItem): BottomNavigationBuilder {
        item.displaySignal = item.displaySignal || signal(true).asReadonly();
        item.shouldShow = true;
        this.items.push(item);
        return this;
    }

    public finish(): BottomNavigationConfig {
        const config = new BottomNavigationConfig();
        config.items = this.items.map(item => {
            item.shouldShow = item.displaySignal!();
            return item;
        });

        return config;
    }
}

@Component({
    selector: 'snt-bottom-navigation',
    templateUrl: './bottom-navigation.component.html',
    styleUrls: ['./bottom-navigation.component.scss'],
})
export class BottomNavigationComponent {
    @Input({ required: true })
    public config!: BottomNavigationConfig;

    constructor(private readonly router: Router) {}

    public static configurate(): BottomNavigationBuilder {
        return new BottomNavigationBuilder();
    }

    public shouldDisplay(item: BottomNavigationItem): boolean {
        return item.displaySignal!();
    }

    public getDisplayLabel(item: BottomNavigationItem): string {
        if (typeof item.label === 'string') {
            return item.label;
        } else {
            return item.label();
        }
    }

    public doClick(item: BottomNavigationItem): void {
        if (typeof item.action === 'string') {
            this.navigateTo(item.action);
        } else {
            item.action();
        }
    }

    private navigateTo(url: string): void {
        this.router.navigate([ url ]);
    }
}
