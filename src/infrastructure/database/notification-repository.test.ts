import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import 'aws-sdk-client-mock-jest';
import { makeNotification } from 'tests/factories/make-notification';
import { NotificationRepository } from './notification-repository';

describe('Infrastructure - Database - Notification repository', () => {
  const mockDynamoDbClient = mockClient(DynamoDBClient);
  let notificationRepository: NotificationRepository;

  beforeAll(() => {
    notificationRepository = new NotificationRepository(
      'notifications-history',
    );
  });

  it('should save notification successfully', async () => {
    await notificationRepository.save(makeNotification());

    expect(mockDynamoDbClient).toHaveReceivedCommandWith(PutCommand, {
      Item: {
        created_at: '2024-07-12T22:18:26.351Z',
        id: expect.any(String),
        metadata: {
          from: 'noreply@cloudburger.com',
          to: ['johndue@gmail.com'],
        },
        notification_id: 'eba521ba-f6b7-46b5-ab5f-dd582495705e',
        receiver: 'johndue@gmail.com',
        status: 'SENT',
        type: 'EMAIL',
      },
      TableName: 'notifications-history',
    });
  });
});
