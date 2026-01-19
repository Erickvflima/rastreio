import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TelemetryService } from './telemetry.service';
import { CreateTelemetryDto } from './dto/create-telemetry';

@ApiTags('Telemetry')
@Controller('telemetry')
export class TelemetryController {
  constructor(private readonly service: TelemetryService) {}

  @Post()
  @ApiOperation({ summary: 'Inserir pacote de telemetria (HEX)' })
  async insert(@Body() dto: CreateTelemetryDto) {
    return this.service.insert(dto.payload);
  }
}
