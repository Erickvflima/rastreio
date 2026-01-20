import { PrimaryGeneratedColumn, CreateDateColumn, Column } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ nullable: true })
  createdBy: number;
}
