import { EventType } from '@prisma/client';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ImportService } from './import.service';
import { RequestAuth0 } from '../models/request.auth0';
import { API_BEARER_NAME, AuthJwtGuard, Tags } from '../shared/constants.api';

@Controller('import')
@ApiTags(Tags.IMPORT, Tags.EVENTS)
@UseGuards(AuthJwtGuard())
@ApiBearerAuth(API_BEARER_NAME)
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
