import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateDeviceDto {
  @ApiPropertyOptional({
    description: 'Indica se o dispositivo está ativo',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
