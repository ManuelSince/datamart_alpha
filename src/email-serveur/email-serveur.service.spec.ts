import { Test, TestingModule } from '@nestjs/testing';
import { EmailServeurService } from './email-serveur.service';

describe('EmailServeurService', () => {
  let service: EmailServeurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailServeurService],
    }).compile();

    service = module.get<EmailServeurService>(EmailServeurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
