import { Test, TestingModule } from '@nestjs/testing';
import { EmailServeurController } from './email-serveur.controller';
import { EmailServeurService } from './email-serveur.service';

describe('EmailServeurController', () => {
  let controller: EmailServeurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailServeurController],
      providers: [EmailServeurService],
    }).compile();

    controller = module.get<EmailServeurController>(EmailServeurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
