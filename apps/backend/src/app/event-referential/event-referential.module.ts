import { Module } from '@nestjs/common';
import { EventReferentialService } from './event-referential.service';
import { EventReferentialController } from './event-referential.controller';

@Module({
    controllers: [EventReferentialController],
    providers: [EventReferentialService],
})
export class EventReferentialModule {}
