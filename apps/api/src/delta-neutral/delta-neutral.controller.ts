import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeltaNeutralService } from './delta-neutral.service';
import { CreatePositionDto } from './dto/create-position.dto';

@Controller('delta-neutral')
@UseGuards(JwtAuthGuard)
export class DeltaNeutralController {
  constructor(private readonly deltaNeutralService: DeltaNeutralService) {}

  @Get(':walletAddress/positions')
  async getPositions(@Param('walletAddress') walletAddress: string) {
    return this.deltaNeutralService.getPositions(walletAddress);
  }

  @Get(':walletAddress/recommended-short')
  async getRecommendedShort(@Param('walletAddress') walletAddress: string) {
    return this.deltaNeutralService.calculateRecommendedShort(walletAddress);
  }

  @Get(':walletAddress/liquidation-risk')
  async getLiquidationRisk(@Param('walletAddress') walletAddress: string) {
    return this.deltaNeutralService.checkLiquidationRisk(walletAddress);
  }

  @Get(':walletAddress/alerts')
  async getAlerts(@Param('walletAddress') walletAddress: string) {
    return this.deltaNeutralService.getAlerts(walletAddress);
  }

  @Post('position')
  async createPosition(@Body() createPositionDto: CreatePositionDto) {
    return this.deltaNeutralService.createPosition(createPositionDto);
  }
}
