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
    // TODO: Fetch actual delta neutral data via API call
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
          <p className="text-gray-400">Loading delta neutral data...</p>
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
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-yellow-400">
              Delta Neutral Strategy
            </h1>
            <p className="text-gray-400 mt-2">
              Position balancing and risk management
            </p>
          </div>
        </div>

        {/* Delta Neutral Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Current Long Position Value
            </h3>
            <p className="text-2xl font-bold text-white">
              ${data.currentLongValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Recommended Short Position
            </h3>
            <p className="text-2xl font-bold text-yellow-400">
              ${data.recommendedShortSize.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Hedge Ratio
            </h3>
            <p className="text-2xl font-bold text-white">
              {(data.hedgeRatio * 100).toFixed(1)}%
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              Delta Neutral PnL
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
                Rebalancing Recommendation
              </h3>
              <p className="text-gray-300">
                Current hedge ratio is {(data.hedgeRatio * 100).toFixed(1)}%.
                Consider additional short positions for optimal delta
                neutrality.
              </p>
            </div>
            <button className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
              Auto Rebalancing
            </button>
          </div>
        </div>

        {/* Positions Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-800">
            <h3 className="text-lg font-semibold text-white">
              Current Positions
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Asset
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Entry Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Current Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    PnL
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Liquidation Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Risk
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
            ⚠️ Risk Alerts
          </h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              • ETH-PERP short position liquidation price is 18.7% above current
              price.
            </p>
            <p className="text-gray-300">
              • Funding rate has turned positive, creating unfavorable
              conditions for short positions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
