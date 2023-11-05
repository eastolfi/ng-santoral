import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './prisma.service';
import { EventsModule } from './events/events.module';
import { EventReferentialModule } from './event-referential/event-referential.module';
import { ImportModule } from './import/import.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        PrismaCrudModule.register({
            prismaService: PrismaService,
        }),
        EventsModule,
        EventReferentialModule,
        ImportModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
