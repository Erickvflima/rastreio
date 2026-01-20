import { Module } from '@nestjs/common';
import { TcpRawServer } from './tcp-raw.server';
import { TelemetryModule } from '@modules/Telemetry/telemetry.module';

@Module({
  providers: [TcpRawServer],
  imports: [TelemetryModule],
})
export class TcpModule {}
