import { IsString, IsNotEmpty, IsNumber, IsObject } from 'class-validator';

export class ExecuteBridgeDto {
  @IsString()
  @IsNotEmpty()
  routeId: string;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsNumber()
  slippageTolerance: number;

  @IsObject()
  route: any; // 선택된 라우트 정보
}
