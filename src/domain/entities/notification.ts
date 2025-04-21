import { Entity, EntityProps } from '../core/entities/entity';
import { NotificationStatus } from './enums/notification-status';
import { NotificationType } from './enums/notification-type';
import { EmailNotification } from './value-objects/email-notification';

interface NotificationProps extends EntityProps {
  receiver: string;
  type: NotificationType;
  status: NotificationStatus;
  metadata: EmailNotification;
  createdAt?: Date;
}

export class Notification extends Entity {
  status: NotificationStatus;
  receiver: string;
  type: NotificationType;
  metadata: EmailNotification;
  createdAt?: Date;

  constructor(input: NotificationProps) {
    super(input.id);

    Object.assign(this, input);
  }

  updateStatus(status: NotificationStatus) {
    this.status = status;
  }
}
