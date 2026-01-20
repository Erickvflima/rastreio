import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Telemetry } from './telemetry.schema';
import { Model } from 'mongoose';
import { validateSFT9001Packet } from './validators/hex.validator';
import { parseLocationPacket } from './parser/stf9001.parser';
import { handleError } from '@common/errors/handle-error.util';
import { IApiResponse } from '@interface/baseResponse';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectModel(Telemetry.name)
    private readonly model: Model<Telemetry>,
  ) {}

  async insert(hexPayload: string): Promise<IApiResponse> {
    try {
      validateSFT9001Packet(hexPayload);

      const parsed = parseLocationPacket(hexPayload);
      const saved = await this.model.create(parsed);

      return {
        status: 'success',
        message: 'Telemetria registrada com sucesso',
        data: saved,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao inserir telemetria');
    }
  }

  async findLastByDeviceId(
    deviceId: number,
  ): Promise<IApiResponse<Telemetry | null>> {
    try {
      const telemetry = await this.model
        .findOne({ deviceId: deviceId })
        .sort({ createdAt: -1 })
        .lean();

      return {
        status: 'success',
        message: telemetry
          ? 'Telemetria encontrada'
          : 'Nenhuma telemetria encontrada',
        data: telemetry,
      };
    } catch (error) {
      throw handleError(error, 'Erro ao buscar telemetria');
    }
  }
}
