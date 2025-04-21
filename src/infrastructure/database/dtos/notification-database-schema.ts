export interface NotificationDatabaseSchema {
  id: string;
  notification_id: string;
  receiver: string;
  status: string;
  type: string;
  metadata: {
    to: string[];
    from: string;
  };
  created_at: string;
}
