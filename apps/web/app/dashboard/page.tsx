"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Shield,
} from "lucide-react";

// 체인 타입
type Chain = "Ethereum" | "HyperEVM" | "HyperCore" | "Base";

// 자산 심볼
type AssetSymbol = "HYPE" | "BTC" | "ETH" | "ENA" | "KAITO";

// 롱 포지션 자산 형태
interface LongAssetForm {
  type: string; // pt-kHYPE, vKHYPE, HYPE, stETH, pt-stETH 등
  percentage: number; // 해당 형태가 차지하는 비율
  balance: number; // 실제 보유 수량
  valueInBase: number; // 베이스 자산으로 환산한 가치 (USD)
  expectedAPR: number; // 기대 APR
  liquidity: number; // 유동성 수준 (0-100%)
}

// 롱 포지션 정보
interface LongPosition {
  chain: Chain;
  forms: LongAssetForm[];
  totalValue: number;
  totalAPR: number; // 가중평균 APR
  averageLiquidity: number; // 평균 유동성
}

// 숏 포지션 정보
interface ShortPosition {
  leverage: number; // 레버리지 배수
  entryPrice: number; // 진입가격
  currentPrice: number; // 현재가격
  liquidationPrice: number; // 청산가격
  liquidationRisk: number; // 청산 리스크 (0-100%)
  fundingRate: number; // 펀딩레이트 (시간당)
  expectedAPR: number; // 펀딩 기반 예상 APR
  notionalValue: number; // 명목 가치
  collateral: number; // 담보
  unrealizedPnL: number; // 미실현 손익
}

// 각 자산의 델타 중립 포트폴리오
interface DeltaNeutralAsset {
  symbol: AssetSymbol;
  spotValue: number; // 스팟(롱) 총 가치
  perpValue: number; // 선물(숏) 총 가치
  delta: number; // 델타 % (-100 ~ 100, 0이 완전 중립)
  longPositions: LongPosition[];
  shortPosition: ShortPosition | null;
  totalAPR: number; // 전체 기대 APR (롱 APR - 숏 비용 or + 숏 수익)
}

// 전체 포트폴리오 데이터
interface PortfolioData {
  totalValue: number;
  totalSpotValue: number;
  totalPerpValue: number;
  overallDelta: number; // 전체 포트폴리오 델타
  overallAPR: number; // 전체 포트폴리오 APR
  assets: DeltaNeutralAsset[];
}

export default function DashboardPage() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalValue: 0,
    totalSpotValue: 0,
    totalPerpValue: 0,
    overallDelta: 0,
    overallAPR: 0,
    assets: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<AssetSymbol | null>(null);

  useEffect(() => {
    // TODO: API 호출로 실제 포트폴리오 데이터 가져오기
    setTimeout(() => {
      setPortfolio({
        totalValue: 500000,
        totalSpotValue: 250000,
        totalPerpValue: 250000,
        overallDelta: 2.5, // 약간 롱 바이어스
        overallAPR: 18.5,
        assets: [
          {
            symbol: "HYPE",
            spotValue: 100000,
            perpValue: 98000,
            delta: 2.0,
            longPositions: [
              {
                chain: "HyperEVM",
                forms: [
                  {
                    type: "pt-kHYPE",
                    percentage: 50,
                    balance: 1250,
                    valueInBase: 50000,
                    expectedAPR: 25,
                    liquidity: 85,
                  },
                  {
                    type: "vKHYPE",
                    percentage: 25,
                    balance: 625,
                    valueInBase: 25000,
                    expectedAPR: 18,
                    liquidity: 70,
                  },
                  {
                    type: "HYPE",
                    percentage: 15,
                    balance: 375,
                    valueInBase: 15000,
                    expectedAPR: 0,
                    liquidity: 100,
                  },
                ],
                totalValue: 90000,
                totalAPR: 17.25,
                averageLiquidity: 85,
              },
              {
                chain: "HyperCore",
                forms: [
                  {
                    type: "HYPE-LP",
                    percentage: 10,
                    balance: 250,
                    valueInBase: 10000,
                    expectedAPR: 35,
                    liquidity: 60,
                  },
                ],
                totalValue: 10000,
                totalAPR: 35,
                averageLiquidity: 60,
              },
            ],
            shortPosition: {
              leverage: 2.5,
              entryPrice: 40,
              currentPrice: 40.8,
              liquidationPrice: 55,
              liquidationRisk: 25,
              fundingRate: -0.01,
              expectedAPR: -8.76,
              notionalValue: 98000,
              collateral: 39200,
              unrealizedPnL: -784,
            },
            totalAPR: 26.01, // 롱 APR + 숏 펀딩 수익
          },
          {
            symbol: "ENA",
            spotValue: 80000,
            perpValue: 79500,
            delta: 0.6,
            longPositions: [
              {
                chain: "Ethereum",
                forms: [
                  {
                    type: "stETH",
                    percentage: 70,
                    balance: 14,
                    valueInBase: 56000,
                    expectedAPR: 4.5,
                    liquidity: 95,
                  },
                  {
                    type: "pt-stETH",
                    percentage: 30,
                    balance: 6,
                    valueInBase: 24000,
                    expectedAPR: 12,
                    liquidity: 80,
                  },
                ],
                totalValue: 80000,
                totalAPR: 6.75,
                averageLiquidity: 90.5,
              },
            ],
            shortPosition: {
              leverage: 3.0,
              entryPrice: 1.05,
              currentPrice: 1.06,
              liquidationPrice: 1.4,
              liquidationRisk: 15,
              fundingRate: -0.005,
              expectedAPR: -4.38,
              notionalValue: 79500,
              collateral: 26500,
              unrealizedPnL: -265,
            },
            totalAPR: 11.13,
          },
          {
            symbol: "BTC",
            spotValue: 50000,
            perpValue: 50000,
            delta: 0,
            longPositions: [
              {
                chain: "Base",
                forms: [
                  {
                    type: "WBTC",
                    percentage: 60,
                    balance: 0.6,
                    valueInBase: 30000,
                    expectedAPR: 2,
                    liquidity: 98,
                  },
                  {
                    type: "tBTC",
                    percentage: 40,
                    balance: 0.4,
                    valueInBase: 20000,
                    expectedAPR: 3.5,
                    liquidity: 85,
                  },
                ],
                totalValue: 50000,
                totalAPR: 2.6,
                averageLiquidity: 92.8,
              },
            ],
            shortPosition: {
              leverage: 2.0,
              entryPrice: 50000,
              currentPrice: 50000,
              liquidationPrice: 70000,
              liquidationRisk: 10,
              fundingRate: 0.002,
              expectedAPR: 1.75,
              notionalValue: 50000,
              collateral: 25000,
              unrealizedPnL: 0,
            },
            totalAPR: 0.85,
          },
          {
            symbol: "ETH",
            spotValue: 60000,
            perpValue: 60000,
            delta: 0,
            longPositions: [
              {
                chain: "Ethereum",
                forms: [
                  {
                    type: "stETH",
                    percentage: 50,
                    balance: 7.5,
                    valueInBase: 30000,
                    expectedAPR: 4.5,
                    liquidity: 95,
                  },
                  {
                    type: "rETH",
                    percentage: 30,
                    balance: 4.5,
                    valueInBase: 18000,
                    expectedAPR: 4.2,
                    liquidity: 90,
                  },
                  {
                    type: "ETH",
                    percentage: 20,
                    balance: 3,
                    valueInBase: 12000,
                    expectedAPR: 0,
                    liquidity: 100,
                  },
                ],
                totalValue: 60000,
                totalAPR: 3.51,
                averageLiquidity: 94,
              },
            ],
            shortPosition: {
              leverage: 2.5,
              entryPrice: 4000,
              currentPrice: 4000,
              liquidationPrice: 5600,
              liquidationRisk: 12,
              fundingRate: 0.001,
              expectedAPR: 0.88,
              notionalValue: 60000,
              collateral: 24000,
              unrealizedPnL: 0,
            },
            totalAPR: 2.63,
          },
          {
            symbol: "KAITO",
            spotValue: 10000,
            perpValue: 9800,
            delta: 2.0,
            longPositions: [
              {
                chain: "Base",
                forms: [
                  {
                    type: "KAITO",
                    percentage: 100,
                    balance: 5000,
                    valueInBase: 10000,
                    expectedAPR: 0,
                    liquidity: 75,
                  },
                ],
                totalValue: 10000,
                totalAPR: 0,
                averageLiquidity: 75,
              },
            ],
            shortPosition: {
              leverage: 4.0,
              entryPrice: 2.0,
              currentPrice: 2.04,
              liquidationPrice: 2.5,
              liquidationRisk: 35,
              fundingRate: -0.02,
              expectedAPR: -17.52,
              notionalValue: 9800,
              collateral: 2450,
              unrealizedPnL: -98,
            },
            totalAPR: 17.52,
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  // 델타 색상 결정
  const getDeltaColor = (delta: number) => {
    if (Math.abs(delta) < 1) return "text-green-400";
    if (Math.abs(delta) < 5) return "text-yellow-400";
    return "text-red-400";
  };

  // 리스크 레벨 색상
  const getRiskColor = (risk: number) => {
    if (risk < 20) return "text-green-400";
    if (risk < 50) return "text-yellow-400";
    return "text-red-400";
  };

  // 리스크 레벨 텍스트
  const getRiskLevel = (risk: number) => {
    if (risk < 20) return "낮음";
    if (risk < 50) return "보통";
    return "높음";
  };

  // 리스크 레벨 배경색
  const getRiskBgColor = (risk: number) => {
    if (risk < 20) return "bg-green-900/30 border-green-500/30";
    if (risk < 50) return "bg-yellow-900/30 border-yellow-500/30";
    return "bg-red-900/30 border-red-500/30";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">대시보드 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">
              델타 중립 대시보드
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              자산별 델타 헤지 현황 및 수익률 분석
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400">총 포트폴리오 가치</p>
            <p className="text-xl font-bold text-white">
              ${portfolio.totalValue.toLocaleString()}
            </p>
            <div className="flex items-center gap-3 mt-1">
              <span
                className={`text-xs ${getDeltaColor(portfolio.overallDelta)}`}
              >
                Δ {portfolio.overallDelta > 0 ? "+" : ""}
                {portfolio.overallDelta.toFixed(2)}%
              </span>
              <span className="text-xs text-green-400">
                APR {portfolio.overallAPR.toFixed(2)}%
              </span>
            </div>
          </div>
        </div>

        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-400">
                총 롱 포지션
              </h3>
              <ArrowUpRight className="w-3 h-3 text-green-400" />
            </div>
            <p className="text-lg font-bold text-white">
              ${portfolio.totalSpotValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              {(
                (portfolio.totalSpotValue / portfolio.totalValue) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-400">
                총 숏 포지션
              </h3>
              <ArrowDownRight className="w-3 h-3 text-red-400" />
            </div>
            <p className="text-lg font-bold text-white">
              ${portfolio.totalPerpValue.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              {(
                (portfolio.totalPerpValue / portfolio.totalValue) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-400">
                포트폴리오 델타
              </h3>
              <Shield className="w-3 h-3 text-yellow-400" />
            </div>
            <p
              className={`text-lg font-bold ${getDeltaColor(portfolio.overallDelta)}`}
            >
              {portfolio.overallDelta > 0 ? "+" : ""}
              {portfolio.overallDelta.toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500">
              {Math.abs(portfolio.overallDelta) < 1
                ? "완벽한 중립"
                : Math.abs(portfolio.overallDelta) < 5
                  ? "거의 중립"
                  : "조정 필요"}
            </p>
          </div>

          <div className="bg-gray-900 p-3 rounded-lg border border-gray-800">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-400">
                예상 연간 수익률
              </h3>
              <TrendingUp className="w-3 h-3 text-green-400" />
            </div>
            <p className="text-lg font-bold text-green-400">
              {portfolio.overallAPR.toFixed(2)}%
            </p>
            <p className="text-xs text-gray-500">펀딩 + 스테이킹 수익</p>
          </div>
        </div>

        {/* Assets Overview */}
        <div className="space-y-4">
          {portfolio.assets.map((asset) => (
            <div
              key={asset.symbol}
              className="bg-gray-900 rounded-lg border border-gray-800"
            >
              {/* Asset Header */}
              <div className="px-4 py-3 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm">
                      {asset.symbol.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">
                        {asset.symbol}
                      </h3>
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`${getDeltaColor(asset.delta)}`}>
                          Δ {asset.delta > 0 ? "+" : ""}
                          {asset.delta.toFixed(2)}%
                        </span>
                        <span className="text-gray-500">|</span>
                        <span className="text-green-400">
                          APR {asset.totalAPR.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setSelectedAsset(
                        selectedAsset === asset.symbol ? null : asset.symbol
                      )
                    }
                    className="text-gray-400 hover:text-white transition-colors text-xs"
                  >
                    {selectedAsset === asset.symbol ? "접기 ▲" : "펼치기 ▼"}
                  </button>
                </div>
              </div>

              {/* Asset Summary */}
              <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-5 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">롱 포지션</p>
                  <p className="text-sm font-medium text-white">
                    ${asset.spotValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">숏 포지션</p>
                  <p className="text-sm font-medium text-white">
                    ${asset.perpValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">델타 노출</p>
                  <p
                    className={`text-sm font-medium ${getDeltaColor(asset.delta)}`}
                  >
                    {asset.delta > 0 ? "+" : ""}
                    {asset.delta.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">리스크 레벨</p>
                  {asset.shortPosition ? (
                    <div
                      className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${getRiskBgColor(asset.shortPosition.liquidationRisk)}`}
                    >
                      <span
                        className={getRiskColor(
                          asset.shortPosition.liquidationRisk
                        )}
                      >
                        {getRiskLevel(asset.shortPosition.liquidationRisk)}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">N/A</p>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">순 APR</p>
                  <p className="text-sm font-medium text-green-400">
                    {asset.totalAPR.toFixed(2)}%
                  </p>
                </div>
              </div>

              {/* Detailed View */}
              {selectedAsset === asset.symbol && (
                <div className="border-t border-gray-800">
                  {/* Long Positions Detail */}
                  <div className="p-4">
                    <h4 className="text-xs font-semibold text-gray-300 mb-3 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3 text-green-400" />롱
                      포지션 상세
                    </h4>
                    {asset.longPositions.map((longPos, idx) => (
                      <div
                        key={idx}
                        className="mb-3 bg-gray-800 rounded-lg p-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-xs font-medium text-yellow-400">
                            {longPos.chain}
                          </h5>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-gray-400">
                              ${longPos.totalValue.toLocaleString()}
                            </span>
                            <span className="text-green-400">
                              APR {longPos.totalAPR.toFixed(1)}%
                            </span>
                            <span className="text-blue-400 flex items-center gap-0.5">
                              <Droplets className="w-2.5 h-2.5" />
                              {longPos.averageLiquidity.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          {longPos.forms.map((form, formIdx) => (
                            <div
                              key={formIdx}
                              className="flex items-center justify-between text-xs bg-gray-700 p-2 rounded"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium text-xs">
                                  {form.type}
                                </span>
                                <span className="text-gray-500 text-xs">
                                  {form.percentage}%
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-xs">
                                <span className="text-gray-400">
                                  {form.balance.toLocaleString()}
                                </span>
                                <span className="text-gray-300">
                                  ${form.valueInBase.toLocaleString()}
                                </span>
                                <span className="text-green-400">
                                  {form.expectedAPR}%
                                </span>
                                <span className="text-blue-400 flex items-center gap-0.5">
                                  <Droplets className="w-2 h-2" />
                                  {form.liquidity}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Short Position Detail */}
                  {asset.shortPosition && (
                    <div className="p-4 border-t border-gray-800">
                      <h4 className="text-xs font-semibold text-gray-300 mb-3 flex items-center gap-1">
                        <ArrowDownRight className="w-3 h-3 text-red-400" />숏
                        포지션 상세
                      </h4>
                      <div className="bg-gray-800 rounded-lg p-3">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              레버리지
                            </p>
                            <p className="text-xs font-medium text-white">
                              {asset.shortPosition.leverage}x
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              진입가 / 현재가
                            </p>
                            <p className="text-xs font-medium text-white">
                              ${asset.shortPosition.entryPrice} / $
                              {asset.shortPosition.currentPrice}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              청산가
                            </p>
                            <p className="text-xs font-medium text-red-400">
                              ${asset.shortPosition.liquidationPrice}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-0.5">
                              청산 리스크{" "}
                              <AlertTriangle className="w-2.5 h-2.5" />
                            </p>
                            <p
                              className={`text-xs font-medium ${getRiskColor(asset.shortPosition.liquidationRisk)}`}
                            >
                              {asset.shortPosition.liquidationRisk}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              펀딩레이트 (8h)
                            </p>
                            <p
                              className={`text-xs font-medium ${asset.shortPosition.fundingRate > 0 ? "text-red-400" : "text-green-400"}`}
                            >
                              {asset.shortPosition.fundingRate > 0 ? "+" : ""}
                              {(asset.shortPosition.fundingRate * 100).toFixed(
                                3
                              )}
                              %
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              예상 APR
                            </p>
                            <p
                              className={`text-xs font-medium ${asset.shortPosition.expectedAPR > 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {asset.shortPosition.expectedAPR > 0 ? "+" : ""}
                              {asset.shortPosition.expectedAPR.toFixed(1)}%
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              담보 / 명목가치
                            </p>
                            <p className="text-xs font-medium text-white">
                              ${asset.shortPosition.collateral.toLocaleString()}{" "}
                              / $
                              {asset.shortPosition.notionalValue.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-0.5">
                              미실현 손익
                            </p>
                            <p
                              className={`text-xs font-medium ${asset.shortPosition.unrealizedPnL >= 0 ? "text-green-400" : "text-red-400"}`}
                            >
                              {asset.shortPosition.unrealizedPnL >= 0
                                ? "+"
                                : ""}
                              $
                              {asset.shortPosition.unrealizedPnL.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Link
            href="/delta-neutral"
            className="px-4 py-2 bg-yellow-400 text-black font-medium text-sm rounded-lg hover:bg-yellow-500 transition-colors"
          >
            델타 조정하기
          </Link>
          <Link
            href="/bridge"
            className="px-4 py-2 border border-yellow-400 text-yellow-400 font-medium text-sm rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
          >
            자산 브릿징
          </Link>
          <button className="px-4 py-2 border border-gray-600 text-gray-400 font-medium text-sm rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
            리밸런싱 실행
          </button>
        </div>
      </div>
    </div>
  );
}
