import logger from '@cloud-burger/logger';
import { EmailSender } from '~/infrastructure/sender/email-sender';
import { NotificationStatus } from '../entities/enums/notification-status';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notification-repository';

export class SendNotificationUseCase {
  constructor(
    private notificatioRepository: NotificationRepository,
    private emailSender: EmailSender,
  ) {}

  async execute(notification: Notification): Promise<void> {
    const { metadata: emailNotification } = notification;

    try {
      await this.emailSender.send(emailNotification);
    } catch (error) {
      logger.error({
        message: 'Error while send email notification',
        data: error,
      });

      notification.updateStatus(NotificationStatus.FAILED);
      await this.saveNotification(notification);

      throw error;
    }

    notification.updateStatus(NotificationStatus.SENT);
    await this.saveNotification(notification);
  }

  private async saveNotification(notification: Notification): Promise<void> {
    return await this.notificatioRepository.save(notification);
  }
}
