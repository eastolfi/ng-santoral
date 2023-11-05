import { EventType } from '@prisma/client';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ImportService } from './import.service';
import { RequestAuth0 } from '../models/request.auth0';

@Controller('import')
@UseGuards(AuthGuard('jwt'))
@ApiTags('EVENTS')
export class ImportController {
    constructor(
        private readonly importService: ImportService,
    ) {}

    @Get('available')
    async getEventsAvailableToImport() {
        return this.importService.getAvailableImports()
            .then(data => ({ data }))
    }

    @Get(':type/:country')
    async getEventsToImport(@Param('type') type: EventType, @Param('country') country: string, @Req() request: RequestAuth0) {
        return this.importService.importEventsFromReferential(request.user['santoral/email'], type, country)
            .then(data => ({ data }));
    }
}
