import { Test, TestingModule } from '@nestjs/testing';
import { VisaApplicationController } from './visa-application.controller';
import { VisaApplicationService } from './visa-application.service';

describe('VisaApplicationController', () => {
  let controller: VisaApplicationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisaApplicationController],
      providers: [VisaApplicationService],
    }).compile();

    controller = module.get<VisaApplicationController>(
      VisaApplicationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
