import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class DeviceIdParamDto {
  @ApiProperty({
    description: 'ID do dispositivo',
    example: 'ABC123456',
  })
  @IsNumber()
  @Type(() => Number)
  deviceId: number;
}
