import { EventType } from '@prisma/client';
import { Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImportEventDto, ImportService } from './import.service';
import { MulterFile, RequestAuth0 } from '../models/request.auth0';
import { API_BEARER_NAME, AuthJwtGuard, Tags } from '../shared/constants.api';
import { ExcelHelper } from '../shared/excel.helper';

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

    @Post('from-file')
    @UseInterceptors(FileInterceptor('file'))
    async fromFile(@UploadedFile() file: MulterFile, @Req() request: RequestAuth0) {
        let events: ImportEventDto[];

        if (file.originalname.endsWith('.xlsx')) {
            events = await ExcelHelper.readXlsx(file);
        } else if (file.originalname.endsWith('.csv')) {
            events = await ExcelHelper.readCsv(file);
        } else {
            throw new Error('Unsupported file type');
        }

        return this.importService.saveEventsFromFile(events, request.user['santoral/email']);
    }
}
