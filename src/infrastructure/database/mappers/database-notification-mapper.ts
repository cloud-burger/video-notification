import { randomUUID } from 'crypto';
import { Notification } from '~/domain/entities/notification';
import { NotificationDatabaseSchema } from '../dtos/notification-database-schema';

export class DatabaseNotificationMapper {
  static toDatabase(notification: Notification): NotificationDatabaseSchema {
    const { metadata } = notification;
    return {
      id: randomUUID(),
      notification_id: notification.id,
      status: notification.status,
      receiver: notification.receiver,
      type: notification.type,
      metadata: {
        to: metadata.to,
        from: metadata.from,
      },
      created_at: notification.createdAt.toISOString(),
    };
  }
}
