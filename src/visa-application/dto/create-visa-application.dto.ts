import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateVisaApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  visaType: string;

  @ApiProperty()
  @IsDate()
  applicationDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  status: string;
}
