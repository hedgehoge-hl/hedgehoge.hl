import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from '@/entities/position.entity';
import { Alert, AlertType } from '@/entities/alert.entity';
import { PortfolioService } from '../portfolio/portfolio.service';
import { HyperliquidService } from '../hyperliquid/hyperliquid.service';
import { CreatePositionDto } from './dto/create-position.dto';

@Injectable()
export class DeltaNeutralService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
    private portfolioService: PortfolioService,
    private hyperliquidService: HyperliquidService,
  ) {}

  async getPositions(walletAddress: string) {
    return this.positionRepository.find({
      where: { walletAddress },
      order: { createdAt: 'DESC' },
    });
  }

  async calculateRecommendedShort(walletAddress: string) {
    // 포트폴리오 데이터 가져오기
    const portfolio =
      await this.portfolioService.getPortfolioByWallet(walletAddress);

    // 델타 뉴트럴을 위한 추천 숏 포지션 계산
    const longPositions =
      portfolio.positions?.filter((p) => p.type === 'long') || [];
    const totalLongValue = longPositions.reduce(
      (sum, pos) => sum + pos.size * pos.currentPrice,
      0,
    );

    // TODO: 더 정교한 델타 뉴트럴 계산 로직 구현
    const recommendedShortSize = totalLongValue * 0.95; // 95% 헤지 비율

    return {
      recommendedShortSize,
      currentLongValue: totalLongValue,
      hedgeRatio: 0.95,
      estimatedFunding: 0, // TODO: 펀딩비 계산
    };
  }

  async checkLiquidationRisk(walletAddress: string) {
    const positions = await this.getPositions(walletAddress);
    const shortPositions = positions.filter((p) => p.type === 'short');

    const riskAnalysis = shortPositions.map((position) => {
      const currentPrice = 0; // TODO: Hyperliquid에서 현재가 가져오기
      const liquidationDistance =
        Math.abs(position.liquidationPrice - currentPrice) / currentPrice;

      return {
        positionId: position.id,
        asset: position.asset,
        liquidationPrice: position.liquidationPrice,
        currentPrice,
        riskLevel:
          liquidationDistance < 0.1
            ? 'HIGH'
            : liquidationDistance < 0.2
              ? 'MEDIUM'
              : 'LOW',
        liquidationDistance,
      };
    });

    return riskAnalysis;
  }

  async getAlerts(walletAddress: string) {
    return this.alertRepository.find({
      where: { walletAddress },
      order: { createdAt: 'DESC' },
      take: 50,
    });
  }

  async createPosition(createPositionDto: CreatePositionDto) {
    const position = this.positionRepository.create(createPositionDto);
    return this.positionRepository.save(position);
  }

  async createAlert(walletAddress: string, type: AlertType, message: string) {
    const alert = this.alertRepository.create({
      walletAddress,
      type,
      message,
    });
    return this.alertRepository.save(alert);
  }
}
