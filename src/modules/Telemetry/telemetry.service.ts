import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Telemetry } from './telemetry.schema';
import { Model } from 'mongoose';
import { validateSFT9001Packet } from './validators/hex.validator';
import { parseLocationPacket } from './parser/stf9001.parser';

@Injectable()
export class TelemetryService {
  constructor(
    @InjectModel(Telemetry.name)
    private readonly model: Model<Telemetry>,
  ) {}

  async insert(hexPayload: string) {
    validateSFT9001Packet(hexPayload);

    const parsed = parseLocationPacket(hexPayload);

    return this.model.create(parsed);
  }
}
