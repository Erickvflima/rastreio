import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocationService } from './location.service';
import { DeviceIdParamDto } from './dto/location.dto';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':deviceId')
  @ApiOperation({ summary: 'Buscar localização por device_id' })
  @ApiParam({
    name: 'deviceId',
    type: String,
    example: 'ABC123456',
  })
  async findByDeviceId(@Param() { deviceId }: DeviceIdParamDto) {
    return this.locationService.findByDeviceId(deviceId);
  }
}
