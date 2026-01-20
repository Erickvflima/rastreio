import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDeviceDto {
  @ApiProperty({
    example: 'SFT-9001',
    description: 'Modelo do dispositivo',
  })
  @IsString()
  @IsNotEmpty()
  model: string;

  @ApiProperty({
    example: '123456789',
    description: 'Identificador único do dispositivo',
  })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;
}
