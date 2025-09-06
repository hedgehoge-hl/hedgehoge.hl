import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeltaNeutralController } from './delta-neutral.controller';
import { DeltaNeutralService } from './delta-neutral.service';
import { Position } from '@/entities/position.entity';
import { Alert } from '@/entities/alert.entity';
import { PortfolioModule } from '../portfolio/portfolio.module';
import { HyperliquidModule } from '../hyperliquid/hyperliquid.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Position, Alert]),
    PortfolioModule,
    HyperliquidModule,
  ],
  controllers: [DeltaNeutralController],
  providers: [DeltaNeutralService],
  exports: [DeltaNeutralService],
})
export class DeltaNeutralModule {}
