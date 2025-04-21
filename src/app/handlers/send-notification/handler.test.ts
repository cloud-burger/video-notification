import { SQSEvent } from 'aws-lambda';
import { mock } from 'jest-mock-extended';
import { handler } from '.';

describe('Handlers - Send notification', () => {
  it('should call send notification worker', async () => {
    const event = mock<SQSEvent>({
      Records: [],
    });

    await handler(event);
  });
});
