import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VisaApplicationService } from './visa-application.service';
import { UpdateVisaApplicationDto } from './dto/update-visa-application.dto';

@Controller('visa-application')
export class VisaApplicationController {
  constructor(
    private readonly visaApplicationService: VisaApplicationService,
  ) {}

  @Post()
  // create(@Body() createVisaApplicationDto: CreateVisaApplicationDto) {
  //   return this.visaApplicationService.create(createVisaApplicationDto);
  // }
  @Get()
  findAll() {
    return this.visaApplicationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visaApplicationService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVisaApplicationDto: UpdateVisaApplicationDto,
  ) {
    return this.visaApplicationService.update(id, updateVisaApplicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visaApplicationService.remove(id);
  }
}
