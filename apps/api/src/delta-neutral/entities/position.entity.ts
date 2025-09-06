import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

export enum PositionType {
  LONG = 'long',
  SHORT = 'short',
}

export enum PositionStatus {
  ACTIVE = 'active',
  CLOSED = 'closed',
  LIQUIDATED = 'liquidated',
}

@Entity('positions')
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'wallet_address' })
  walletAddress: string;

  @Column()
  asset: string;

  @Column({
    type: 'enum',
    enum: PositionType,
  })
  type: PositionType;

  @Column('decimal', { precision: 18, scale: 8 })
  size: number;

  @Column('decimal', { precision: 18, scale: 2 })
  entryPrice: number;

  @Column('decimal', { precision: 18, scale: 2, nullable: true })
  exitPrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  leverage: number;

  @Column('decimal', { precision: 18, scale: 2, nullable: true })
  liquidationPrice: number;

  @Column({
    type: 'enum',
    enum: PositionStatus,
    default: PositionStatus.ACTIVE,
  })
  status: PositionStatus;

  @Column('decimal', { precision: 18, scale: 2, nullable: true })
  pnl: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
