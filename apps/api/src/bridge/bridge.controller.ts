import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BridgeService } from './bridge.service';
import { GetRouteDto } from './dto/get-route.dto';
import { ExecuteBridgeDto } from './dto/execute-bridge.dto';

@Controller('bridge')
@UseGuards(JwtAuthGuard)
export class BridgeController {
  constructor(private readonly bridgeService: BridgeService) {}

  @Get('routes')
  async getRoutes(@Query() getRouteDto: GetRouteDto) {
    return this.bridgeService.getOptimalRoutes(getRouteDto);
  }

  @Get('jumper/routes')
  async getJumperRoutes(@Query() getRouteDto: GetRouteDto) {
    return this.bridgeService.getJumperRoutes(getRouteDto);
  }

  @Get('pendle/opportunities')
  async getPendleOpportunities() {
    return this.bridgeService.getPendleOpportunities();
  }

  @Post('execute')
  async executeBridge(@Body() executeBridgeDto: ExecuteBridgeDto) {
    return this.bridgeService.executeBridge(executeBridgeDto);
  }

  @Get('supported-chains')
  async getSupportedChains() {
    return this.bridgeService.getSupportedChains();
  }

  @Get('supported-tokens')
  async getSupportedTokens(@Query('chainId') chainId?: string) {
    return this.bridgeService.getSupportedTokens(chainId);
  }
}
