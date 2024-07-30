import { Injectable } from '@nestjs/common';
import { CreateVisaApplicationDto } from './dto/create-visa-application.dto';
import { UpdateVisaApplicationDto } from './dto/update-visa-application.dto';
import { DatabaseService } from 'src/database/database.service';
import { ServiceService } from 'src/service/service.service';
import { CreateServiceDto } from 'src/service/dto/create-service.dto';

@Injectable()
export class VisaApplicationService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly serviceService: ServiceService,
  ) {}

  async create(
    createVisaApplicationDto: CreateVisaApplicationDto,
    createServiceDto: CreateServiceDto,
  ) {
    const service = await this.serviceService.create(createServiceDto);
    const visaApplication = await this.databaseService.visaApplication.create({
      data: {
        ...createVisaApplicationDto,
        service: {
          connect: { id: service.id },
        },
      },
    });
    return visaApplication;
  }

  async findAll() {
    const visaApplications =
      await this.databaseService.visaApplication.findMany({
        include: {
          service: true, // Include service information
        },
      });
    return visaApplications;
  }

  async findOne(id: string) {
    const visaApplication =
      await this.databaseService.visaApplication.findUnique({
        where: { id },
        include: {
          service: true, // Include service information
        },
      });
    return visaApplication;
  }

  async update(id: string, updateVisaApplicationDto: UpdateVisaApplicationDto) {
    const visaApplication = await this.databaseService.visaApplication.update({
      where: { id },
      data: updateVisaApplicationDto,
    });
    return visaApplication;
  }

  async remove(id: string) {
    const visaApplication = await this.databaseService.visaApplication.delete({
      where: { id },
    });
    return visaApplication;
  }
}
