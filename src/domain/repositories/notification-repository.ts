import { Notification } from '../entities/notification';

export interface NotificationRepository {
  save(notification: Notification): Promise<void>;
}
