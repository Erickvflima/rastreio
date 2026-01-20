import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class BindDeviceDto {
  @ApiProperty({
    description: 'ID do usuário que será vinculado ao dispositivo',
    example: 1,
  })
  @IsNumber()
  userId: number;

  @ApiProperty({
    description: 'ID do dispositivo a ser vinculado ao usuário',
    example: 10,
  })
  @IsNumber()
  deviceId: number;
}
