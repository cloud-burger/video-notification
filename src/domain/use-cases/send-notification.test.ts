import { mock, MockProxy } from 'jest-mock-extended';
import { makeNotification } from 'tests/factories/make-notification';
import { EmailSender } from '~/infrastructure/sender/email-sender';
import { NotificationRepository } from '../repositories/notification-repository';
import { SendNotificationUseCase } from './send-notification';

describe('Domain - Use cases - Send notification', () => {
  let notificatioRepository: MockProxy<NotificationRepository>;
  let emailSender: MockProxy<EmailSender>;
  let sendNotificationUseCase: SendNotificationUseCase;

  beforeAll(() => {
    notificatioRepository = mock();
    emailSender = mock();
    sendNotificationUseCase = new SendNotificationUseCase(
      notificatioRepository,
      emailSender,
    );
  });

  it('should send email notificaiton successfully', async () => {
    notificatioRepository.save.mockResolvedValue();
    emailSender.send.mockResolvedValue();

    await sendNotificationUseCase.execute(makeNotification());

    expect(notificatioRepository.save).toHaveBeenNthCalledWith(1, {
      createdAt: new Date('2024-07-12T22:18:26.351Z'),
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      metadata: {
        content: 'Vídeo processado com sucesso',
        from: 'noreply@cloudburger.com',
        title: 'Vídeo processado',
        to: ['johndue@gmail.com'],
      },
      receiver: 'johndue@gmail.com',
      status: 'SENT',
      type: 'EMAIL',
    });
    expect(emailSender.send).toHaveBeenNthCalledWith(1, {
      content: 'Vídeo processado com sucesso',
      from: 'noreply@cloudburger.com',
      title: 'Vídeo processado',
      to: ['johndue@gmail.com'],
    });
  });

  it('should throw when error while send email notificaiton', async () => {
    notificatioRepository.save.mockResolvedValue();
    emailSender.send.mockRejectedValue(new Error('Email not found'));

    await expect(
      sendNotificationUseCase.execute(makeNotification()),
    ).rejects.toThrow('Email not found');

    expect(notificatioRepository.save).toHaveBeenNthCalledWith(1, {
      createdAt: new Date('2024-07-12T22:18:26.351Z'),
      id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
      metadata: {
        content: 'Vídeo processado com sucesso',
        from: 'noreply@cloudburger.com',
        title: 'Vídeo processado',
        to: ['johndue@gmail.com'],
      },
      receiver: 'johndue@gmail.com',
      status: 'FAILED',
      type: 'EMAIL',
    });
    expect(emailSender.send).toHaveBeenNthCalledWith(1, {
      content: 'Vídeo processado com sucesso',
      from: 'noreply@cloudburger.com',
      title: 'Vídeo processado',
      to: ['johndue@gmail.com'],
    });
  });
});
