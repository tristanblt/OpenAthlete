import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { CoreModule } from './core';
import { PrismaService } from './prisma/services/prisma.service';

@Module({
  imports: [AuthModule, CoreModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
