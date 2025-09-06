import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Portfolio } from '@/entities/portfolio.entity';
import { HyperliquidService } from '../hyperliquid/hyperliquid.service';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(Portfolio)
    private portfolioRepository: Repository<Portfolio>,
    private hyperliquidService: HyperliquidService,
  ) {}

  async getPortfolioByWallet(walletAddress: string) {
    // Hyperliquid API에서 실시간 데이터 가져오기
    const liveData =
      await this.hyperliquidService.getPortfolioData(walletAddress);

    // DB에 캐싱된 데이터와 비교/업데이트
    await this.updatePortfolioCache(walletAddress, liveData);

    return liveData;
  }

  async getPortfolioSummary(walletAddress: string) {
    const portfolio = await this.getPortfolioByWallet(walletAddress);

    return {
      totalValue: portfolio.totalValue,
      totalPnL: portfolio.totalPnL,
      assetCount: portfolio.assets.length,
      positionCount: portfolio.positions.length,
    };
  }

  async calculateAPY(walletAddress: string) {
    // APY 계산 로직 구현
    const historicalData = await this.portfolioRepository.find({
      where: { walletAddress },
      order: { timestamp: 'DESC' },
      take: 30, // 최근 30일 데이터
    });

    // TODO: APY 계산 로직 구현
    return { apy: 0 };
  }

  private async updatePortfolioCache(walletAddress: string, data: any) {
    // DB 캐싱 로직 구현
    // TODO: 포트폴리오 데이터 캐싱
  }
}
