import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AuthModule } from './auth';
import { PrismaService } from './prisma/services/prisma.service';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
