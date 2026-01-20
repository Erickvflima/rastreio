import { Injectable, NotFoundException } from '@nestjs/common';
import { IApiResponse } from '@interface/baseResponse';
import { handleError } from '@common/errors/handle-error.util';
import { TelemetryService } from '@modules/Telemetry/telemetry.service';

@Injectable()
export class LocationService {
  constructor(private readonly telemetryService: TelemetryService) {}

  async findByDeviceId(deviceId: string): Promise<IApiResponse> {
    try {
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
