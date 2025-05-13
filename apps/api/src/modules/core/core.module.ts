import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from '../auth';
import { PrismaService } from '../prisma/services/prisma.service';
import { EventController } from './controllers';
import { AthleteController } from './controllers/athlete.controller';
import { ConnectorController } from './controllers/connector.controller';
import { EquipmentController } from './controllers/equipment.controller';
import { EventTemplateController } from './controllers/event-template.controller';
import { RecordController } from './controllers/record.controller';
import { StatisticsController } from './controllers/statistics.controller';
import { TrainingZoneController } from './controllers/training-zone.controller';
import { EventService } from './services';
import { AthleteService } from './services/athlete.service';
import { StravaConnectorService } from './services/connector/strava.service';
import { EquipmentService } from './services/equipment.service';
import { EventTemplateService } from './services/event-template.service';
import { RecordService } from './services/record.service';
import { StatisticsService } from './services/statistics.service';
import { TrainingZoneService } from './services/training-zone.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [
    EventController,
    EventTemplateController,
    ConnectorController,
    AthleteController,
    StatisticsController,
    RecordController,
    EquipmentController,
    TrainingZoneController,
  ],
  providers: [
    EventService,
    EventTemplateService,
    StravaConnectorService,
    AthleteService,
    StatisticsService,
    PrismaService,
    RecordService,
    EquipmentService,
    TrainingZoneService,
  ],
  exports: [EventService],
})
export class CoreModule {}
