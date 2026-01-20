import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { TelemetryModule } from '@modules/Telemetry/telemetry.module';
import { DevicesByUserModule } from '@modules/DevicesByUser/devicesByUser.module';

@Module({
  imports: [TelemetryModule, DevicesByUserModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
