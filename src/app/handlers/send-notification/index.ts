import { LambdaSqsHandler } from '@cloud-burger/handlers';
import logger from '@cloud-burger/logger';
import { SendNotificationWorker } from 'adapters/workers/send-notification';
import { SQSEvent } from 'aws-lambda';
import { env } from '~/app/env';
import { SendNotificationUseCase } from '~/domain/use-cases/send-notification';
import { NotificationRepository } from '~/infrastructure/database/notification-repository';
import { EmailSender } from '~/infrastructure/sender/email-sender';

let notificationRepository: NotificationRepository;
let emailSender: EmailSender;
let sendNotificationUseCase: SendNotificationUseCase;
let sendNotificationWorker: SendNotificationWorker;
let sqsHandler: LambdaSqsHandler;

const setDependencies = () => {
  notificationRepository = new NotificationRepository(
    env.DYNAMO_TABLE_NOTIFICATIONS_HISTORY,
  );
  emailSender = new EmailSender();
  sendNotificationUseCase = new SendNotificationUseCase(
    notificationRepository,
    emailSender,
  );
  sendNotificationWorker = new SendNotificationWorker(sendNotificationUseCase);
  sqsHandler = new LambdaSqsHandler(sendNotificationWorker.handler);
};

export const handler = async (event: SQSEvent): Promise<void> => {
  logger.debug({
    message: 'Event received',
    data: event,
  });

  setDependencies();

  return await sqsHandler.handler(event);
};
