import { Injectable } from '@nestjs/common';
import { PrismaCrudService } from 'nestjs-prisma-crud';

@Injectable()
export class EventsService extends PrismaCrudService {
  constructor() {
    super({
      model: 'events',
      allowedJoins: [],
      defaultJoins: [],
    });
  }
}
