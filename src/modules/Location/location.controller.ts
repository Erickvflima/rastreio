import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocationService } from './location.service';

@ApiTags('Location')
@ApiBearerAuth()
@Controller('api/v1/location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get(':device_id')
  @ApiOperation({ summary: 'Buscar localização por device_id' })
  @ApiParam({
    name: 'device_id',
    type: String,
    example: 'ABC123456',
  })
  findByDeviceId(@Param('device_id') deviceId: string) {
    return this.locationService.findByDeviceId(deviceId);
  }
}
