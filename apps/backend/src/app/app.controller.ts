import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AppService } from './app.service';
import { API_BEARER_NAME, Tags } from './shared/constants.api';

@Controller()
@ApiBearerAuth(API_BEARER_NAME)
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('healthcheck')
    @ApiTags(Tags.DEBUG)
    public healthCheck() {
        return true;
    }
}
