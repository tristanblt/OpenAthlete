import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { CoreModule } from './core';
import { PrismaService } from './prisma/services/prisma.service';

@Module({
  imports: [AuthModule, CoreModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
