import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth';
import { PrismaService } from '../prisma/services/prisma.service';
import { EventController } from './controllers';
import { ConnectorController } from './controllers/connector.controller';
import { EventService } from './services';
import { ConnectorService } from './services/connector.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [EventController, ConnectorController],
  providers: [EventService, ConnectorService, PrismaService],
  exports: [EventService],
})
export class CoreModule {}
