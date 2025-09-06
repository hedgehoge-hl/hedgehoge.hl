"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Asset {
  symbol: string;
  amount: number;
  value: number;
  pnL: number;
  change24h: number;
}

interface PortfolioData {
  totalValue: number;
  totalPnL: number;
  assets: Asset[];
}

export default function PortfolioPage() {
  const [portfolio, setPortfolio] = useState<PortfolioData>({
    totalValue: 0,
    totalPnL: 0,
    assets: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API 호출로 실제 포트폴리오 데이터 가져오기
    setTimeout(() => {
      setPortfolio({
        totalValue: 125000,
        totalPnL: 8500,
        assets: [
          {
            symbol: "ETH",
            amount: 45.5,
            value: 85000,
            pnL: 5500,
            change24h: 2.3,
          },
          {
            symbol: "BTC",
            amount: 0.8,
            value: 35000,
            pnL: 2800,
            change24h: 1.8,
          },
          {
            symbol: "USDC",
            amount: 5000,
            value: 5000,
            pnL: 200,
            change24h: 0.1,
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">포트폴리오 데이터를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              href="/dashboard"
              className="text-yellow-400 hover:text-yellow-500 mb-2 inline-block"
            >
              ← 대시보드로 돌아가기
            </Link>
            <h1 className="text-3xl font-bold text-yellow-400">포트폴리오</h1>
            <p className="text-gray-400 mt-2">자산 현황 및 수익률 분석</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">총 자산 가치</p>
            <p className="text-2xl font-bold text-white">
              ${portfolio.totalValue.toLocaleString()}
            </p>
            <p
              className={`text-sm ${portfolio.totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {portfolio.totalPnL >= 0 ? "+" : ""}$
              {portfolio.totalPnL.toLocaleString()} PnL
            </p>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              총 자산 수
            </h3>
            <p className="text-2xl font-bold text-white">
              {portfolio.assets.length}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              평균 수익률
            </h3>
            <p className="text-2xl font-bold text-green-400">
              {(
                (portfolio.totalPnL /
                  (portfolio.totalValue - portfolio.totalPnL)) *
                100
              ).toFixed(2)}
              %
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              최고 수익 자산
            </h3>
            <p className="text-2xl font-bold text-yellow-400">
              {portfolio.assets.reduce(
                (max, asset) => (asset.pnL > max.pnL ? asset : max),
                portfolio.assets[0]
              )?.symbol || "N/A"}
            </p>
          </div>
        </div>

        {/* Assets Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white">보유 자산</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    자산
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    수량
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    평가금액
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    PnL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    24h 변동
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    비중
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {portfolio.assets.map((asset, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold text-sm mr-3">
                          {asset.symbol.charAt(0)}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {asset.symbol}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {asset.amount.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                      ${asset.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={
                          asset.pnL >= 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {asset.pnL >= 0 ? "+" : ""}${asset.pnL.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={
                          asset.change24h >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {asset.change24h >= 0 ? "+" : ""}
                        {asset.change24h}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {((asset.value / portfolio.totalValue) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Link
            href="/delta-neutral"
            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            델타 뉴트럴 전략 보기
          </Link>
          <Link
            href="/bridge"
            className="px-6 py-3 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
          >
            자산 브릿징
          </Link>
        </div>
      </div>
    </div>
  );
}
