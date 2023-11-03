import { EventType } from '@prisma/client';
import { Controller, Get, Param } from '@nestjs/common';

import { ImportService } from './import.service';

@Controller('import')
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
    async getEventsToImport(@Param('type') type: EventType, @Param('country') country: string) {
        return this.importService.importEventsFromReferential(type, country)
            .then(data => ({ data }));
    }
}
