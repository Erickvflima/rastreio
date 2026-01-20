import { Device } from '@modules/Device/device.entity';
import { User } from '@modules/User/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesByUserController } from './devicesByUser.controller';
import { DevicesByUser } from './devicesByUser.entity';
import { DevicesByUserService } from './devicesByUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([DevicesByUser, User, Device])],
  controllers: [DevicesByUserController],
  providers: [DevicesByUserService],
  exports: [DevicesByUserService],
})
export class DevicesByUserModule {}
