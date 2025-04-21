import { EmailNotification } from '~/domain/entities/value-objects/email-notification';

export class EmailMapper {
  static toProvider(notification: EmailNotification) {
    return {
      from: notification.from,
      to: notification.to,
      subject: notification.title,
      text: notification.content,
    };
  }
}
