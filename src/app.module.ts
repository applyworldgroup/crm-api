import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AddressModule } from './address/address.module';
import { CustomerModule } from './customer/customer.module';

@Module({
  imports: [DatabaseModule, AddressModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
