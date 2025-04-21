const defaultFrom = 'noreply@cloudburger.com';

export class EmailNotification {
  title: string;
  to: string[];
  from?: string;
  content?: string;

  constructor(input: EmailNotification) {
    this.from = input.from ?? defaultFrom;

    Object.assign(this, input);
  }
}
