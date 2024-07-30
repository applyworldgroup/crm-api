import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AddressModule } from 'src/address/address.module';
import { DatabaseModule } from 'src/database/database.module';
import { AddressService } from 'src/address/address.service';

@Module({
  imports: [AddressModule, DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, AddressService],
})
export class CustomerModule {}
