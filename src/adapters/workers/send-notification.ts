import { Message, Worker } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { NotificationStatus } from '~/domain/entities/enums/notification-status';
import { NotificationType } from '~/domain/entities/enums/notification-type';
import { Notification } from '~/domain/entities/notification';
import { SendNotificationUseCase } from '~/domain/use-cases/send-notification';

type Input = {
  status: string;
  user: {
    email: string;
  };
};

export class SendNotificationWorker {
  constructor(private sendNotificationUseCase: SendNotificationUseCase) {}

  handler: Worker<Input> = async (
    messages: Message<Input>[],
  ): Promise<void> => {
    await Promise.all(
      messages.map(async (message) => {
        logger.info({
          message: 'Send notification request',
          data: message,
        });

        const { body } = message;

        const contentMap = {
          FAILED: 'O processamento do vídeo falhou.',
          PROCESSED: 'O processamento do vídeo foi concluído.',
        };

        await this.sendNotificationUseCase.execute(
          new Notification({
            status: NotificationStatus.WAITING,
            receiver: body.user.email,
            type: NotificationType.EMAIL,
            metadata: {
              title: 'Retorno de solicitação de processamento de vídeo',
              to: [body.user.email],
              content: contentMap[body.status],
            },
          }),
        );

        logger.info({
          message: 'Send notification response',
        });
      }),
    );
  };
}
