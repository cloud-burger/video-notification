import { EmailNotification } from '../entities/value-objects/email-notification';

export interface NotificationSender {
  send(notification: EmailNotification): Promise<void>;
}
