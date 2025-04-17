import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth';
import { PrismaService } from '../prisma/services/prisma.service';
import { EventController } from './controllers';
import { AthleteController } from './controllers/athlete.controller';
import { ConnectorController } from './controllers/connector.controller';
import { StatisticsController } from './controllers/statistics.controller';
import { EventService } from './services';
import { AthleteService } from './services/athlete.service';
import { StravaConnectorService } from './services/connector/strava.service';
import { StatisticsService } from './services/statistics.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [
    EventController,
    ConnectorController,
    AthleteController,
    StatisticsController,
  ],
  providers: [
    EventService,
    StravaConnectorService,
    AthleteService,
    StatisticsService,
    PrismaService,
  ],
  exports: [EventService],
})
export class CoreModule {}
