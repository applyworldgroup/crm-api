import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AddressService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createAddressDto: CreateAddressDto) {
    const existingAddress = await this.databaseService.address.findFirst({
      where: {
        AND: [
          { streetLine1: createAddressDto.streetLine1 },
          { postalCode: createAddressDto.postalCode },
          { city: createAddressDto.city },
          { country: createAddressDto.country },
        ],
      },
    });

    if (existingAddress) {
      return existingAddress;
    }

    const address = await this.databaseService.address.create({
      data: createAddressDto,
      include: { customers: true },
    });
    return address;
  }

  async findAll() {
    const addresses = await this.databaseService.address.findMany();
    return addresses;
  }

  async findOne(id: string) {
    const address = await this.databaseService.address.findUnique({
      where: { id },
      include: { customers: true },
    });
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.databaseService.address.update({
      where: { id },
      data: updateAddressDto,
    });
    return address;
  }

  async remove(id: string) {
    const addressWithCustomers = await this.databaseService.address.findFirst({
      where: { id },
      include: { customers: true },
    });

    if (addressWithCustomers && addressWithCustomers.customers.length > 0) {
      throw new ConflictException('Address is currently in use by a customer');
    }

    const deletedAddress = await this.databaseService.address.delete({
      where: { id },
    });

    return deletedAddress;
  }
}
