import { MailDataRequired, default as SendGrid } from '@sendgrid/mail';

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ApiEnvSchemaType, EmailId, emailLibrary } from '@openathlete/shared';

import { SendEmail } from '../types';

@Injectable()
export class NotificationService {
  constructor(private configService: ConfigService<ApiEnvSchemaType, true>) {
    SendGrid.setApiKey(configService.get('SENDGRID_API_KEY') ?? '');
  }

  async sendEmail<T extends EmailId>(payload: SendEmail<T>) {
    try {
      await SendGrid.send({
        to: payload.to,
        from: this.configService.get('SENDGRID_FROM_EMAIL'),
        subject: payload.subject || emailLibrary[payload.type].defaultSubject,
        html: `<ul>${Object.entries(payload.params)
          .map(([key, value]) => `<li>${key}: ${value}</li>`)
          .join('')}</ul>`,
      } as MailDataRequired & { templateId?: string });
    } catch (error: any) {
      console.error('Error sending email', error?.response?.body);
    }
  }
}
