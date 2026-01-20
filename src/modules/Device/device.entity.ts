import { BaseEntity } from '@common/database/base.entity';
import { TablePostgres } from '@enums/postgres.database';
import { Column, Entity } from 'typeorm';

@Entity(TablePostgres.DEVICES)
export class Device extends BaseEntity {
  @Column({ unique: true })
  serial: string;

  @Column()
  model: string;

  @Column({ default: true })
  active: boolean;
}
