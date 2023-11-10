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
    Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RequestAuth0 } from '../models/request.auth0';
import { API_BEARER_NAME, AuthJwtGuard, Tags } from '../shared/constants.api';

@Controller('events')
@ApiTags(Tags.EVENTS)
@UseGuards(AuthJwtGuard())
@ApiBearerAuth(API_BEARER_NAME)
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    async create(
        @Body() createEventDto: CreateEventDto,
        @Query('crudQuery') crudQuery: string,
        @Req() request: RequestAuth0,
    ) {
        const calendar = await this.eventsService.ensureCalendar(request.user['santoral/email']);
        const created = await this.eventsService.create({
            ...createEventDto,
            calendars: {
                calendar: {
                    id: calendar.id
                }
            }
        }, {
            crudQuery,
        });
        return created;
    }

    @Get()
    async findMany(@Query('crudQuery') crudQuery?: string) {
        return await this.eventsService.findMany({ crudQuery });
    }

    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @Query('crudQuery') crudQuery: string,
    ) {
        const match = await this.eventsService.findOne(id, { crudQuery });
        return match;
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
        @Query('crudQuery') crudQuery: string,
    ) {
        const updated = await this.eventsService.update(id, updateEventDto, {
            crudQuery,
        });
        return updated;
    }

    @Delete(':id')
    async remove(
        @Param('id') id: string,
        @Query('crudQuery') crudQuery: string,
    ) {
        return this.eventsService.remove(id, { crudQuery });
    }
}
