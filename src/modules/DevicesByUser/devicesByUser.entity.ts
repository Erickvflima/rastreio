import { BaseEntity } from '@common/database/base.entity';
import { TablePostgres } from '@enums/postgres.database';
import { Device } from '@modules/Device/device.entity';
import { User } from '@modules/User/user.entity';
import { Entity, ManyToOne, Unique } from 'typeorm';

@Entity(TablePostgres.DEVICES_BY_USER)
@Unique(['user', 'device'])
export class DevicesByUser extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Device, { eager: true })
  device: Device;
}
