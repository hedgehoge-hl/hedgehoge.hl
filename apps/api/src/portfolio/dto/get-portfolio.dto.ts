import { IsString, IsNotEmpty } from 'class-validator';

export class GetPortfolioDto {
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
