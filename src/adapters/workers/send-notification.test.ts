import { Message } from '@cloud-burger/handlers';
import { mock, MockProxy } from 'jest-mock-extended';
import { SendNotificationUseCase } from '~/domain/use-cases/send-notification';
import { SendNotificationWorker } from './send-notification';

describe('Adapters - Workers - Send notification', () => {
  let sendNotificationUseCase: MockProxy<SendNotificationUseCase>;
  let sendNotificationWorker: SendNotificationWorker;

  beforeAll(() => {
    sendNotificationUseCase = mock();
    sendNotificationWorker = new SendNotificationWorker(
      sendNotificationUseCase,
    );
  });

  it('should send notification successfully', async () => {
    sendNotificationUseCase.execute.mockResolvedValue();

    await sendNotificationWorker.handler([
      {
        body: {
          status: 'PROCESSED',
          user: {
            email: 'test@gmail.com',
          },
        },
      } as unknown as Message<any>,
    ]);

    expect(sendNotificationUseCase.execute).toHaveBeenNthCalledWith(1, {
      id: expect.any(String),
      createdAt: expect.any(Date),
      metadata: {
        content: 'O processamento do vídeo foi concluído.',
        title: 'Retorno de solicitação de processamento de vídeo',
        to: ['test@gmail.com'],
      },
      receiver: 'test@gmail.com',
      status: 'WAITING',
      type: 'EMAIL',
    });
  });
});
