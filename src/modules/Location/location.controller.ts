import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { LocationService } from './location.service';
import { DeviceIdParamDto } from './dto/location.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';

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
  async findByDeviceId(
    @CurrentUser() user: { id: number },
    @Param() { deviceId }: DeviceIdParamDto,
  ) {
    return this.locationService.findByDeviceId(user.id, deviceId);
  }
}
