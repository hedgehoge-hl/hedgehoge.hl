import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PortfolioService } from './portfolio.service';
import { GetPortfolioDto } from './dto/get-portfolio.dto';

@Controller('portfolio')
@UseGuards(JwtAuthGuard)
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':walletAddress')
  async getPortfolio(@Param('walletAddress') walletAddress: string) {
    return this.portfolioService.getPortfolioByWallet(walletAddress);
  }

  @Get(':walletAddress/summary')
  async getPortfolioSummary(@Param('walletAddress') walletAddress: string) {
    return this.portfolioService.getPortfolioSummary(walletAddress);
  }

  @Get(':walletAddress/apy')
  async getAPY(@Param('walletAddress') walletAddress: string) {
    return this.portfolioService.calculateAPY(walletAddress);
  }
}
