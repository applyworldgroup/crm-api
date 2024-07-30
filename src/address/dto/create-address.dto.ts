import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @ApiPropertyOptional()
  @IsOptional()
  unit?: string;

  @ApiProperty()
  @IsNotEmpty()
  streetLine1: string;

  @ApiPropertyOptional()
  @IsOptional()
  streetLine2?: string;

  @ApiProperty()
  @IsNotEmpty()
  suburb: string;

  @ApiProperty()
  @IsNotEmpty()
  postalCode: string;

  @ApiProperty()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  country: string;
}
