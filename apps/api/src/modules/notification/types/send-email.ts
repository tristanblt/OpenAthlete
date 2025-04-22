import { EmailId, EmailPropsFromId } from '@openathlete/shared';

export interface SendEmail<T extends EmailId> {
  type: T;
  to: string;
  params: EmailPropsFromId<T>;
  subject?: string;
}
