import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class EventReferentialService extends PrismaCrudService {
    constructor() {
        super({
            model: 'eventReferential',
            allowedJoins: [],
            defaultJoins: [],
        });
    }
}
