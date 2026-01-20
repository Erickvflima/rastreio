import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TelemetryModule } from '@modules/Telemetry/telemetry.module';

@Module({
  imports: [TelemetryModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
