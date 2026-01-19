import { IsHexadecimal, IsString } from 'class-validator';

export class CreateTelemetryDto {
  @IsString()
  @IsHexadecimal()
  payload: string;
}
