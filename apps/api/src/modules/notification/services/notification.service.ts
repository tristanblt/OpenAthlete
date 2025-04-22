import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiEnvSchemaType, EmailId } from '@openathlete/shared';

import { SendEmail } from '../types';

@Injectable()
export class NotificationService {
  constructor(private configService: ConfigService<ApiEnvSchemaType, true>) {}

  async sendEmail<T extends EmailId>(payload: SendEmail<T>) {
    console.log('Sending email...', payload);
  }
}
