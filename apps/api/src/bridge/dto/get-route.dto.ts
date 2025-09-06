import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class GetRouteDto {
  @IsString()
  @IsNotEmpty()
  fromChain: string;

  @IsString()
  @IsNotEmpty()
  toChain: string;

  @IsString()
  @IsNotEmpty()
  fromToken: string;

  @IsString()
  @IsNotEmpty()
  toToken: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
