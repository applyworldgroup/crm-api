import { Module } from '@nestjs/common';
import { VisaApplicationService } from './visa-application.service';
import { VisaApplicationController } from './visa-application.controller';

@Module({
  controllers: [VisaApplicationController],
  providers: [VisaApplicationService],
})
export class VisaApplicationModule {}
