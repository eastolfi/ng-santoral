import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './prisma.service';
import { EventsModule } from './events/events.module';
import { EventReferentialModule } from './event-referential/event-referential.module';
import { ImportModule } from './import/import.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppConfigModule } from './config/config.module';

@Module({
    imports: [
        AppConfigModule,
        PrismaCrudModule.register({
            prismaService: PrismaService,
        }),
        EventsModule,
        EventReferentialModule,
        ImportModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
