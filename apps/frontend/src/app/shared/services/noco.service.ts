import { Injectable } from '@angular/core';
import { Api } from 'nocodb-sdk';

const api = new Api({
    baseURL: 'http://192.168.1.88:9091',
    headers: {
        'xc-token': import.meta.env.NG_APP_NOCODB_TOKEN,
    },
});

export type ApiDB = Api<unknown>;

@Injectable()
export class NocoService {
    constructor() {}

    public get instance(): ApiDB {
        return api;
    }
}
