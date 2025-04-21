import { sendEmail } from '@cloud-burger/utils';
import { makeNotification } from 'tests/factories/make-notification';
import { EmailSender } from './email-sender';

jest.mock('@cloud-burger/utils');

describe('Infrastructure - Sender - Email sender', () => {
  const sendEmailMock = jest.mocked(sendEmail);
  let emailSender: EmailSender;

  beforeAll(() => {
    emailSender = new EmailSender();
  });

  it('should send email successfully', async () => {
    sendEmailMock.mockResolvedValue(null);

    await emailSender.send(makeNotification().metadata);

    expect(sendEmailMock).toHaveBeenNthCalledWith(1, {
      from: 'noreply@cloudburger.com',
      subject: 'Vídeo processado',
      text: 'Vídeo processado com sucesso',
      to: ['johndue@gmail.com'],
    });
  });
});
