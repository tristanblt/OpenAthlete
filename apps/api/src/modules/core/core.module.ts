import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth';
import { PrismaService } from '../prisma/services/prisma.service';
import { EventController } from './controllers';
import { ConnectorController } from './controllers/connector.controller';
import { EventService } from './services';
import { StravaConnectorService } from './services/connector/strava.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [EventController, ConnectorController],
  providers: [EventService, StravaConnectorService, PrismaService],
  exports: [EventService],
})
export class CoreModule {}
