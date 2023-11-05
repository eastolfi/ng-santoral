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
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { RequestAuth0 } from '../models/request.auth0';

@Controller('events')
@ApiTags('EVENTS')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
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
    @UseGuards(AuthGuard('jwt'))
    async findMany(@Query('crudQuery') crudQuery?: string) {
        return await this.eventsService.findMany({ crudQuery });
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(
        @Param('id') id: string,
        @Query('crudQuery') crudQuery: string,
    ) {
        const match = await this.eventsService.findOne(id, { crudQuery });
        return match;
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
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
    @UseGuards(AuthGuard('jwt'))
    async remove(
        @Param('id') id: string,
        @Query('crudQuery') crudQuery: string,
    ) {
        return this.eventsService.remove(id, { crudQuery });
    }
}
