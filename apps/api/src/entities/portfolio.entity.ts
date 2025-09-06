import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '@/entities/user.entity';

@Entity('portfolios')
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'wallet_address' })
  walletAddress: string;

  @Column()
  asset: string;

  @Column('decimal', { precision: 18, scale: 8 })
  amount: number;

  @Column('decimal', { precision: 18, scale: 2 })
  value: number;

  @Column('decimal', { precision: 18, scale: 2, nullable: true })
  pnl: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'timestamptz' })
  timestamp: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
