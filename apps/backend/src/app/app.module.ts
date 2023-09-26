import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaCrudModule } from 'nestjs-prisma-crud';
import { PrismaService } from './prisma.service';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    PrismaCrudModule.register({
      prismaService: PrismaService
    }),
    EventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
