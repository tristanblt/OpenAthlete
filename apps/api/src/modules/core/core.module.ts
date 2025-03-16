import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth';
import { PrismaService } from '../prisma/services/prisma.service';
import { EventController } from './controllers';
import { EventService } from './services';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [EventController],
  providers: [EventService, PrismaService],
  exports: [EventService],
})
export class CoreModule {}
