/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { envValidationSchema } from '@config/env.validations';
import { ValidationModule } from '@modules/Validation/validation.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryModule } from '@modules/Telemetry/telemetry.module';

@Module({
  imports: [
    ValidationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: envValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: config.get('POSTGRES_SYNCHRONIZE') || false,
        retryAttempts: 10,
        retryDelay: 120_000,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        dbName: config.get<string>('MONGO_DB_NAME'),
        retryAttempts: 10,
        retryDelay: 120_000,
      }),
      inject: [ConfigService],
    }),
    TelemetryModule,
  ],
})
export class AppModule {}
