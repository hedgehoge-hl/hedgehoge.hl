"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Chain {
  id: string;
  name: string;
  symbol: string;
}

interface Token {
  symbol: string;
  address: string;
  decimals: number;
}

interface Route {
  provider: string;
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
  estimatedOutput: string;
  estimatedTime: string;
  fees: string;
  apy?: string;
}

export default function BridgePage() {
  const [chains] = useState<Chain[]>([
    { id: "1", name: "Ethereum", symbol: "ETH" },
    { id: "42161", name: "Arbitrum", symbol: "ARB" },
    { id: "10", name: "Optimism", symbol: "OP" },
    { id: "137", name: "Polygon", symbol: "MATIC" },
    { id: "8453", name: "Base", symbol: "BASE" },
  ]);

  const [tokens] = useState<Token[]>([
    { symbol: "ETH", address: "0x...", decimals: 18 },
    { symbol: "USDC", address: "0x...", decimals: 6 },
    { symbol: "USDT", address: "0x...", decimals: 6 },
    { symbol: "WBTC", address: "0x...", decimals: 8 },
  ]);

  const [fromChain, setFromChain] = useState("1");
  const [toChain, setToChain] = useState("42161");
  const [fromToken, setFromToken] = useState("USDC");
  const [toToken, setToToken] = useState("USDC");
  const [amount, setAmount] = useState("1000");
  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchRoutes = async () => {
    setIsLoading(true);

    // TODO: 실제 API 호출
    setTimeout(() => {
      setRoutes([
        {
          provider: "Jumper",
          fromChain: chains.find((c) => c.id === fromChain)?.name || "",
          toChain: chains.find((c) => c.id === toChain)?.name || "",
          fromToken,
          toToken,
          estimatedOutput: (parseFloat(amount) * 0.998).toFixed(2),
          estimatedTime: "5-10분",
          fees: "0.2%",
        },
        {
          provider: "Pendle",
          fromChain: chains.find((c) => c.id === fromChain)?.name || "",
          toChain: chains.find((c) => c.id === toChain)?.name || "",
          fromToken,
          toToken,
          estimatedOutput: (parseFloat(amount) * 0.9995).toFixed(2),
          estimatedTime: "3-7분",
          fees: "0.05%",
          apy: "12.5%",
        },
        {
          provider: "Native Bridge",
          fromChain: chains.find((c) => c.id === fromChain)?.name || "",
          toChain: chains.find((c) => c.id === toChain)?.name || "",
          fromToken,
          toToken,
          estimatedOutput: (parseFloat(amount) * 0.999).toFixed(2),
          estimatedTime: "10-15분",
          fees: "0.1%",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      fetchRoutes();
    }
  }, [fromChain, toChain, fromToken, toToken, amount]);

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
              브릿징 & 스왑
            </h1>
            <p className="text-gray-400 mt-2">자산 이동 및 최적 경로 안내</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bridge Form */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-6">
              브릿지 설정
            </h3>

            <div className="space-y-6">
              {/* From Section */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  From
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={fromChain}
                    onChange={(e) => setFromChain(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={fromToken}
                    onChange={(e) => setFromToken(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                  >
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setFromChain(toChain);
                    setToChain(fromChain);
                    setFromToken(toToken);
                    setToToken(fromToken);
                  }}
                  className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                >
                  ↕️
                </button>
              </div>

              {/* To Section */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  To
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <select
                    value={toChain}
                    onChange={(e) => setToChain(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                  >
                    {chains.map((chain) => (
                      <option key={chain.id} value={chain.id}>
                        {chain.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={toToken}
                    onChange={(e) => setToToken(e.target.value)}
                    className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-400"
                  >
                    {tokens.map((token) => (
                      <option key={token.symbol} value={token.symbol}>
                        {token.symbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Routes */}
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-6">최적 경로</h3>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mx-auto mb-4"></div>
                <p className="text-gray-400">경로를 찾는 중...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {routes.map((route, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer hover:border-yellow-400 ${
                      index === 0
                        ? "border-yellow-400 bg-yellow-400/5"
                        : "border-gray-700"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">
                          {route.provider}
                        </span>
                        {route.apy && (
                          <span className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded-full">
                            APY {route.apy}
                          </span>
                        )}
                        {index === 0 && (
                          <span className="px-2 py-1 bg-yellow-400/10 text-yellow-400 text-xs rounded-full">
                            추천
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-gray-400">
                        {route.estimatedTime}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-400">예상 수령량</p>
                        <p className="text-white font-medium">
                          {route.estimatedOutput} {route.toToken}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-400">수수료</p>
                        <p className="text-white">{route.fees}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {routes.length > 0 && !isLoading && (
              <button className="w-full mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors">
                브릿지 실행
              </button>
            )}
          </div>
        </div>

        {/* Pendle Opportunities */}
        <div className="mt-8 bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-6">
            🌾 Pendle 수익 기회
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">
                  PT-stETH-26DEC2024
                </span>
                <span className="text-green-400 font-bold">15.2% APY</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>TVL: $125M</p>
                <p>만기: 2024-12-26</p>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">
                  PT-ezETH-27JUN2024
                </span>
                <span className="text-green-400 font-bold">18.7% APY</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>TVL: $89M</p>
                <p>만기: 2024-06-27</p>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-white">
                  PT-weETH-26SEP2024
                </span>
                <span className="text-green-400 font-bold">13.4% APY</span>
              </div>
              <div className="text-sm text-gray-400">
                <p>TVL: $67M</p>
                <p>만기: 2024-09-26</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
