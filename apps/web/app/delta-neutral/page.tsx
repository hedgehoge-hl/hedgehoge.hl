"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Position {
  id: string;
  asset: string;
  type: "long" | "short";
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnL: number;
  liquidationPrice?: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

interface DeltaNeutralData {
  currentLongValue: number;
  recommendedShortSize: number;
  hedgeRatio: number;
  positions: Position[];
  totalPnL: number;
}

export default function DeltaNeutralPage() {
  const [data, setData] = useState<DeltaNeutralData>({
    currentLongValue: 0,
    recommendedShortSize: 0,
    hedgeRatio: 0,
    positions: [],
    totalPnL: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API 호출로 실제 델타 뉴트럴 데이터 가져오기
    setTimeout(() => {
      setData({
        currentLongValue: 85000,
        recommendedShortSize: 80750,
        hedgeRatio: 0.95,
        totalPnL: 2500,
        positions: [
          {
            id: "1",
            asset: "ETH-PERP",
            type: "long",
            size: 45.5,
            entryPrice: 1800,
            currentPrice: 1870,
            pnL: 3185,
            riskLevel: "LOW",
          },
          {
            id: "2",
            asset: "ETH-PERP",
            type: "short",
            size: 43.2,
            entryPrice: 1850,
            currentPrice: 1870,
            pnL: -864,
            liquidationPrice: 2220,
            riskLevel: "MEDIUM",
          },
          {
            id: "3",
            asset: "BTC-PERP",
            type: "short",
            size: 0.8,
            entryPrice: 42000,
            currentPrice: 43500,
            pnL: -1200,
            liquidationPrice: 50400,
            riskLevel: "LOW",
          },
        ],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "text-green-400 bg-green-400/10";
      case "MEDIUM":
        return "text-yellow-400 bg-yellow-400/10";
      case "HIGH":
        return "text-red-400 bg-red-400/10";
      default:
        return "text-gray-400 bg-gray-400/10";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-gray-400">델타 뉴트럴 데이터를 불러오는 중...</p>
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
            <h1 className="text-3xl font-bold text-yellow-400">
              델타 뉴트럴 전략
            </h1>
            <p className="text-gray-400 mt-2">포지션 밸런싱 및 리스크 관리</p>
          </div>
        </div>

        {/* Delta Neutral Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              현재 롱 포지션 가치
            </h3>
            <p className="text-2xl font-bold text-white">
              ${data.currentLongValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              추천 숏 포지션
            </h3>
            <p className="text-2xl font-bold text-yellow-400">
              ${data.recommendedShortSize.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              헤지 비율
            </h3>
            <p className="text-2xl font-bold text-white">
              {(data.hedgeRatio * 100).toFixed(1)}%
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              델타 뉴트럴 PnL
            </h3>
            <p
              className={`text-2xl font-bold ${data.totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {data.totalPnL >= 0 ? "+" : ""}${data.totalPnL.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Rebalancing Recommendation */}
        <div className="bg-gray-900 p-6 rounded-lg border border-yellow-400 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                리밸런싱 추천
              </h3>
              <p className="text-gray-300">
                현재 헤지 비율이 {(data.hedgeRatio * 100).toFixed(1)}%입니다.
                최적의 델타 뉴트럴을 위해 추가 숏 포지션을 고려해보세요.
              </p>
            </div>
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
              자동 리밸런싱
            </button>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white">현재 포지션</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    자산
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    타입
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    사이즈
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    진입가
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    현재가
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    PnL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    청산가
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    리스크
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {data.positions.map((position) => (
                  <tr
                    key={position.id}
                    className="hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {position.asset}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          position.type === "long"
                            ? "bg-green-400/10 text-green-400"
                            : "bg-red-400/10 text-red-400"
                        }`}
                      >
                        {position.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {position.size.toLocaleString(undefined, {
                        maximumFractionDigits: 4,
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      ${position.entryPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-medium">
                      ${position.currentPrice.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={
                          position.pnL >= 0 ? "text-green-400" : "text-red-400"
                        }
                      >
                        {position.pnL >= 0 ? "+" : ""}$
                        {position.pnL.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {position.liquidationPrice
                        ? `$${position.liquidationPrice.toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(position.riskLevel)}`}
                      >
                        {position.riskLevel}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Risk Alerts */}
        <div className="mt-8 bg-red-900/20 border border-red-400 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-red-400 mb-4">
            ⚠️ 리스크 알림
          </h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              • ETH-PERP 숏 포지션의 청산가가 현재가 대비 18.7% 상승한 지점에
              있습니다.
            </p>
            <p className="text-gray-300">
              • 펀딩비가 양수로 전환되어 숏 포지션에 불리한 상황입니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
