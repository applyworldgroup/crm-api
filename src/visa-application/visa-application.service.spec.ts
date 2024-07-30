import { Test, TestingModule } from '@nestjs/testing';
import { VisaApplicationService } from './visa-application.service';

describe('VisaApplicationService', () => {
  let service: VisaApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VisaApplicationService],
    }).compile();

    service = module.get<VisaApplicationService>(VisaApplicationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
