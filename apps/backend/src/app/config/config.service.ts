import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type AvailableEnvs = 'AUTH0_DOMAIN' | 'AUTH0_ISSUER_URL' | 'AUTH0_AUDIENCE' |
    'AUTH0_CLIENT_ID' | 'AUTH0_CLIENT_SECRET' | 'AUTH0_CALLBACK_URL' | 'JWT_SECRET';

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    get(key: AvailableEnvs): string {
        return this.configService.get(key);
    }

    getOrThrow(key: AvailableEnvs): string {
        return this.configService.getOrThrow(key);
    }
}
