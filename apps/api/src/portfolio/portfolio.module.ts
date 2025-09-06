import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { Portfolio } from '@/entities/portfolio.entity';
import { HyperliquidModule } from '../hyperliquid/hyperliquid.module';

@Module({
  imports: [TypeOrmModule.forFeature([Portfolio]), HyperliquidModule],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}
