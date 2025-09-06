import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { PositionType } from '../entities/position.entity';

export class CreatePositionDto {
  @IsNumber()
  userId: number;

  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @IsString()
  @IsNotEmpty()
  asset: string;

  @IsEnum(PositionType)
  type: PositionType;

  @IsNumber()
  size: number;

  @IsNumber()
  entryPrice: number;

  @IsNumber()
  leverage: number;

  @IsNumber()
  @IsOptional()
  liquidationPrice?: number;
}
