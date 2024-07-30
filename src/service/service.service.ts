import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ServiceService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createServiceDto: CreateServiceDto) {
    const service = await this.databaseService.service.create({
      data: createServiceDto,
    });
    return service;
  }

  async findAll() {
    const services = await this.databaseService.service.findMany();
    return services;
  }

  async findOne(id: string) {
    const service = await this.databaseService.service.findUnique({
      where: { id },
    });
    return service;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const service = await this.databaseService.service.update({
      where: { id },
      data: updateServiceDto,
    });
    return service;
  }

  async remove(id: string) {
    const service = await this.databaseService.service.delete({
      where: { id },
    });
    return service;
  }
}
