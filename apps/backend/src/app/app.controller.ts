import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { API_BEARER_NAME, JwtAuthGuard, Tags } from './shared/constants.api';
import { AppConfigService } from './config/config.service';

@Controller()
@ApiBearerAuth(API_BEARER_NAME)
export class AppController {
    constructor(private readonly configService: AppConfigService) {}

    @Get('healthcheck')
    @ApiTags(Tags.DEBUG)
    public healthCheck() {
        return true;
    }

    @Get('healthcheck/secured')
    @ApiTags(Tags.DEBUG)
    @UseGuards(JwtAuthGuard())
    public healthCheckSecured() {
        return true;
    }

    @Get('version')
    @ApiTags(Tags.DEBUG)
    public version() {
        return '0.0.0';
    }
}
