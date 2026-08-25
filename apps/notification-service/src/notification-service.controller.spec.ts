import { Test, TestingModule } from '@nestjs/testing';
import { NotificationController } from './notification-service.controller';
import { NotificationService } from './notification-service.service';

describe('NotificationController', () => {
  let notificationController: NotificationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationController],
      providers: [NotificationService],
    }).compile();

    notificationController = app.get<NotificationController>(NotificationController);
  });
});
