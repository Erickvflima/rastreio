import { BaseEntity } from '@common/database/base.entity';
import { TablePostgres } from '@enums/postgres.database';
import { Entity, Column, Unique } from 'typeorm';

@Entity(TablePostgres.USERS)
@Unique(['email'])
export class User extends BaseEntity {
  @Column()
  email: string;
}
