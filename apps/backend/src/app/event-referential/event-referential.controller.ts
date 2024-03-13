import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateEventReferentialDto } from './dto/create-event-referential.dto';
import { UpdateEventReferentialDto } from './dto/update-event-referential.dto';
import { EventReferentialService } from './event-referential.service';
import { API_BEARER_NAME, JwtAuthGuard, Tags } from '../shared/constants.api';

@Controller('event-referential')
@ApiTags(Tags.REFERENTIAL)
@UseGuards(JwtAuthGuard())
@ApiBearerAuth(API_BEARER_NAME)
export class EventReferentialController {
    constructor(
        private readonly eventReferentialService: EventReferentialService,
    ) {}

    @Post()
    async create(
        @Body() createEventReferentialDto: CreateEventReferentialDto,
        @Query('crudQuery') crudQuery: string,
    ) {
        const created = await this.eventReferentialService.create(
            createEventReferentialDto,
            { crudQuery },
        );
        return created;
    }

    @Get()
    async findMany(@Query('crudQuery') crudQuery: string) {
        const matches = await this.eventReferentialService.findMany({
            crudQuery,
        });
        return matches;
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Query('crudQuery') crudQuery: string,
    ) {
        const match = await this.eventReferentialService.findOne(id, {
            crudQuery,
        });
        return match;
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEventReferentialDto: UpdateEventReferentialDto,
        @Query('crudQuery') crudQuery: string,
    ) {
        const updated = await this.eventReferentialService.update(
            id,
            updateEventReferentialDto,
            { crudQuery },
        );
        return updated;
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Query('crudQuery') crudQuery: string,
    ) {
        return this.eventReferentialService.remove(id, { crudQuery });
    }
}
