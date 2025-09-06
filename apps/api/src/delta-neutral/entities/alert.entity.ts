import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/user.entity';

export enum AlertType {
  LIQUIDATION_RISK = 'liquidation_risk',
  POSITION_CHANGE = 'position_change',
  FUNDING_RATE = 'funding_rate',
  DELTA_IMBALANCE = 'delta_imbalance',
}

@Entity('alerts')
export class Alert {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'wallet_address' })
  walletAddress: string;

  @Column({
    type: 'enum',
    enum: AlertType,
  })
  type: AlertType;

  @Column('text')
  message: string;

  @Column({ default: false })
  read: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
