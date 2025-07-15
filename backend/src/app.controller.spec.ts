import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('protected', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
