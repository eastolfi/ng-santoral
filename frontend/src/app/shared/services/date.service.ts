import { Injectable } from '@angular/core';

const weekDays = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ];
const months = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

// @Injectable()
export class ToastService {
    public static messages: string[] = [];
}

@Injectable()
export class DateService {
    constructor() {}

    private _today = new Date();
    public get today(): Date {
        return this._today;
    }
    public set today(date: Date) {
        this._today = date;
    }

    public createDate(year: number, month: number, day: number): Date {
        return new Date(Date.UTC(year, month-1, day));
    }

    public format(date: Date): string {
        return `${this.getYear(date)}${this.getMonthShort(date)}${this.getDay(date)}`;
    }

    public parse(date: string): Date {
        const year = parseInt(date.substring(0, 4));
        const month = parseInt(date.substring(4, 6));
        const day = parseInt(date.substring(6, 8));
        return this.createDate(year, month, day)
    }

    public add(what: number, to: Date): Date {
        const newDate = new Date(to);
        newDate.setDate(newDate.getDate() + what);

        return newDate;
    }

    public getWeekDate(from: Date): string {
        return weekDays[from.getDay()];
    }

    public getDay(from: Date): string {
        return from.getDate().toString().padStart(2, '0');
    }

    public getMonth(from: Date): string {
        return months[from.getMonth()];
    }

    public getMonthShort(from: Date): string {
        return (from.getMonth() + 1).toString().padStart(2, '0');
    }

    public getYear(from: Date): string {
        return from.getFullYear().toString();
    }
}
