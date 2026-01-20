import { envValidationSchema } from '@config/env.validations';
import { ValidationModule } from '@modules/Validation/validation.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TelemetryModule } from '@modules/Telemetry/telemetry.module';
import { AuthModule } from '@modules/Auth/auth.module';
import { UserModule } from '@modules/User/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { LocationModule } from '@modules/Location/location.module';

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
        schema: 'dbo',
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
    AuthModule,
    UserModule,
    LocationModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
