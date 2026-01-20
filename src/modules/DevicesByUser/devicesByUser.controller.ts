import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BindDeviceDto } from './dto/bind-device.dto';
import { DevicesByUserService } from './devicesByUser.service';

@ApiTags('DevicesByUser')
@ApiBearerAuth()
@Controller('devices-by-user')
export class DevicesByUserController {
  constructor(private readonly service: DevicesByUserService) {}

  @Post('bind')
  @ApiOperation({
    summary: 'Vincular dispositivo a um usuário',
    description:
      'Realiza o vínculo entre um dispositivo existente e um usuário autenticado.',
  })
  @ApiResponse({
    status: 201,
    description: 'Dispositivo vinculado ao usuário com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dispositivo já vinculado ou dados inválidos',
  })
  @ApiResponse({
    status: 401,
    description: 'Usuário não autenticado',
  })
  async bind(@Body() dto: BindDeviceDto) {
    return this.service.bind(dto);
  }
}
