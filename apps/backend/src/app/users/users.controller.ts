import {
    Controller,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { API_BEARER_NAME, JwtAuthGuard, Tags } from '../shared/constants.api';

@Controller('users')
@ApiTags(Tags.USERS)
@UseGuards(JwtAuthGuard())
@ApiBearerAuth(API_BEARER_NAME)
export class UsersController {
}
