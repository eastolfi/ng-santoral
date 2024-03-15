import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RequestAuth0 } from '../models/request.auth0';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth0Guard, Tags } from '../shared/constants.api';

@Controller('auth')
@ApiTags(Tags.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    // @Get('auth0/login')
    // @UseGuards(Auth0Guard())
    // @ApiOperation({ summary: 'Login with Auth0' })
    // async auth0Login() {
    //     // No explicit implementation is needed here as AuthGuard handles the authentication flow
    // }
    //
    // @Get('auth0/callback')
    // @UseGuards(Auth0Guard())
    // @ApiOperation({ summary: 'Auth0 callback after login' })
    // async callback(@Request() req: RequestAuth0): Promise<{ access_token: string }> {
    //     return this.authService.login(req.user);
    // }
}

