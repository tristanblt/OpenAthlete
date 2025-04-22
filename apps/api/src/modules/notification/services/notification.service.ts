import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiEnvSchemaType, EmailId, emailLibrary } from '@openathlete/shared';

import { SendEmail } from '../types';

const sgMail = require('@sendgrid/mail');

@Injectable()
export class NotificationService {
  constructor(private configService: ConfigService<ApiEnvSchemaType, true>) {
    sgMail.setApiKey(configService.get('SENDGRID_API_KEY') ?? '');
  }

  async sendEmail<T extends EmailId>(payload: SendEmail<T>) {
    try {
      await sgMail.send({
        to: payload.to,
        from: this.configService.get('SENDGRID_FROM_EMAIL'),
        subject: payload.subject || emailLibrary[payload.type].defaultSubject,
        html: `<ul>${Object.entries(payload.params)
          .map(([key, value]) => `<li>${key}: ${value}</li>`)
          .join('')}</ul>`,
      });
    } catch (error: any) {
      console.error('Error sending email', error?.response?.body);
    }
  }
}
