import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@frontend/envs/environment';
import { ApiResponse, ApiSingleResponse } from '@frontend/models/response';

export type AvailableImports = { type: string, country: string }

@Injectable()
export class ImportService {
    constructor(
        private readonly http: HttpClient,
    ) {}

    public getAvailableImports() {
        return this.http.get<ApiResponse<AvailableImports>>(`${environment.apiUrl}/import/available`)
    }

    public importEvents(eventType: string) {
        const [ type, country ] = eventType.split('_');
        return this.http.get<ApiSingleResponse<number>>(`${environment.apiUrl}/import/${type}/${country}`)
    }
}
