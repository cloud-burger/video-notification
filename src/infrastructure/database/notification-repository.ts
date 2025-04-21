import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { Notification } from '~/domain/entities/notification';
import { NotificationRepository as INotificationRepository } from '~/domain/repositories/notification-repository';
import { DatabaseNotificationMapper } from './mappers/database-notification-mapper';

export class NotificationRepository implements INotificationRepository {
  private readonly client: DynamoDBClient;

  constructor(private notificationsTable: string) {
    this.client = new DynamoDBClient({ region: 'us-east-1' });
  }

  async save(notification: Notification): Promise<void> {
    await this.client.send(
      new PutCommand({
        TableName: this.notificationsTable,
        Item: DatabaseNotificationMapper.toDatabase(notification),
      }),
    );
  }
}
