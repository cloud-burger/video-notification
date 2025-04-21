import { sendEmail } from '@cloud-burger/utils';
import { EmailNotification } from '~/domain/entities/value-objects/email-notification';
import { NotificationSender } from '~/domain/sender/notification-sender';
import { EmailMapper } from './mapper/email-mapper';

export class EmailSender implements NotificationSender {
  async send(notification: EmailNotification): Promise<void> {
    await sendEmail(EmailMapper.toProvider(notification));
  }
}
