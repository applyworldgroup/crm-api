import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AddressModule } from './address/address.module';
import { CustomerModule } from './customer/customer.module';
import { ServiceResolver } from './service/service.resolver';
import { ServiceModule } from './service/service.module';
import { VisaApplicationModule } from './visa-application/visa-application.module';

@Module({
  imports: [
    DatabaseModule,
    AddressModule,
    CustomerModule,
    ServiceModule,
    VisaApplicationModule,
  ],
  controllers: [AppController],
  providers: [AppService, ServiceResolver],
})
export class AppModule {}
