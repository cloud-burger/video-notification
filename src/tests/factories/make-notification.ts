import { NotificationStatus } from '~/domain/entities/enums/notification-status';
import { NotificationType } from '~/domain/entities/enums/notification-type';
import { Notification } from '~/domain/entities/notification';

export const makeNotification = (
  override: Partial<Notification> = {},
): Notification =>
  new Notification({
    createdAt: new Date('2024-07-12T22:18:26.351Z'),
    id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
    metadata: {
      title: 'Vídeo processado',
      to: ['johndue@gmail.com'],
      from: 'noreply@cloudburger.com',
      content: 'Vídeo processado com sucesso',
    },
    receiver: 'johndue@gmail.com',
    status: NotificationStatus.SENT,
    type: NotificationType.EMAIL,
    ...override,
  });
