import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Telemetry {
  @Prop() deviceId: number;
  @Prop() timestamp: Date;
  @Prop() latitude: number;
  @Prop() longitude: number;
  @Prop() speed: number;
  @Prop() direction: number;
  @Prop() odometer: number;
  @Prop() hourmeter: number;
  @Prop({
    type: {
      gpsFixed: Boolean,
      gpsHistory: Boolean,
      ignitionOn: Boolean,
      latNegative: Boolean,
      lngNegative: Boolean,
    },
  })
  flags: {
    gpsFixed: boolean;
    gpsHistory: boolean;
    ignitionOn: boolean;
    latNegative: boolean;
    lngNegative: boolean;
  };
}

export const TelemetrySchema = SchemaFactory.createForClass(Telemetry);
