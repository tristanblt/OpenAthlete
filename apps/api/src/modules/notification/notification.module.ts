import { Module } from '@nestjs/common';

import { NotificationService } from './services';

@Module({
  providers: [NotificationService],
  controllers: [],
  exports: [NotificationService],
})
export class NotificationModule {}
