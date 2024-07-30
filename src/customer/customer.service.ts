import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { DatabaseService } from 'src/database/database.service';
import { AddressService } from 'src/address/address.service';

@Injectable()
export class CustomerService {
  constructor(
    private databaseService: DatabaseService,
    private addressService: AddressService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { address, dateOfBirth, ...customerData } = createCustomerDto;
    // Convert dateOfBirth string to Date object
    let formattedDateOfBirth: Date;
    try {
      formattedDateOfBirth = new Date(dateOfBirth);
      if (isNaN(formattedDateOfBirth.getTime())) {
        throw new Error('Invalid date format');
      }
    } catch (error) {
      throw new BadRequestException('Invalid dateOfBirth format');
    }

    // Use AddressService to create the address first
    const createdAddress = await this.addressService.create(address);
    try {
      const customer = await this.databaseService.customer.create({
        data: {
          ...customerData,
          dateOfBirth: formattedDateOfBirth,
          address: {
            connect: { id: createdAddress.id },
          },
        },
        include: { address: true },
      });

      return customer;
    } catch (error) {
      throw new Error();
    }
  }

  async findAll() {
    const customers = await this.databaseService.customer.findMany({
      include: {
        address: true, // Include address details if needed
      },
    });
    return customers;
  }

  async findOne(id: string) {
    const customer = await this.databaseService.customer.findUnique({
      where: { id },
      include: {
        address: true, // Include address details if needed
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with id ${id} not found`);
    }

    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const { address, ...customerData } = updateCustomerDto;

    const updatedCustomer = await this.databaseService.customer.update({
      where: { id },
      data: {
        ...customerData,
        ...(address ? { address: { update: address } } : {}),
      },
      include: { address: true },
    });

    return updatedCustomer;
  }

  async remove(id: string) {
    const customer = await this.databaseService.customer.delete({
      where: { id },
    });

    return customer;
  }
}
