import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { IApiResponse } from '@interface/baseResponse';
import { handleError } from '@common/errors/handle-error.util';
import { TelemetryService } from '@modules/Telemetry/telemetry.service';
import { DevicesByUserService } from '@modules/DevicesByUser/devicesByUser.service';

@Injectable()
export class LocationService {
  constructor(
    private readonly telemetryService: TelemetryService,
    private readonly devicesByUserService: DevicesByUserService,
  ) {}

  async findByDeviceId(
    userId: number,
    deviceId: number,
  ): Promise<IApiResponse> {
    try {
      const hasAccess = await this.devicesByUserService.existsByUserAndDevice(
        userId,
        String(deviceId),
      );
      if (!hasAccess) {
        throw new ForbiddenException(
          'Você não tem permissão para acessar este dispositivo',
        );
      }
      const result = await this.telemetryService.findLastByDeviceId(deviceId);
      if (!result.data) {
        throw new NotFoundException('Localização não encontrada');
      }

      return {
        status: 'success',
        message: 'Localização encontrada',
        data: result.data,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao buscar localização');
    }
  }
}
