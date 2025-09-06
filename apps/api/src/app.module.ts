import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PortfolioModule } from './portfolio/portfolio.module';
import { DeltaNeutralModule } from './delta-neutral/delta-neutral.module';
import { BridgeModule } from './bridge/bridge.module';
import { HyperliquidModule } from './hyperliquid/hyperliquid.module';
import { User } from './users/user.entity';
import { Portfolio } from './portfolio/entities/portfolio.entity';
import { Position } from './delta-neutral/entities/position.entity';
import { Alert } from './delta-neutral/entities/alert.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        ssl: configService.get('DB_SSL') === 'true',
        autoLoadEntities: true,
        synchronize: configService.get('NODE_ENV') !== 'production',
        logging: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UsersModule,
    PortfolioModule,
    DeltaNeutralModule,
    BridgeModule,
    HyperliquidModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
