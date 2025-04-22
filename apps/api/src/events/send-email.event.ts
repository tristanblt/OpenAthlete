import { EmailId } from '@openathlete/shared';

import { SendEmail } from 'src/modules/notification/types';

export class SendEmailEvent<T extends EmailId> {
  static SLUG = 'notification.email.send';

  constructor(public readonly payload: SendEmail<T>) {}
}
