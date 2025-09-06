"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface DashboardStats {
  totalValue: number;
  totalPnL: number;
  apy: number;
  activePositions: number;
  riskLevel: "LOW" | "MEDIUM" | "HIGH";
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalValue: 0,
    totalPnL: 0,
    apy: 0,
    activePositions: 0,
    riskLevel: "LOW",
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: API 호출로 실제 데이터 가져오기
    setTimeout(() => {
      setStats({
        totalValue: 125000,
        totalPnL: 8500,
        apy: 15.2,
        activePositions: 3,
        riskLevel: "MEDIUM",
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  const getRiskColor = (level: string) => {
    switch (level) {
      case "LOW":
        return "text-green-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "HIGH":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

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
            <h1 className="text-3xl font-bold text-yellow-400">대시보드</h1>
            <p className="text-gray-400 mt-2">
              포트폴리오 현황 및 델타 뉴트럴 전략 관리
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/portfolio"
              className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              포트폴리오
            </Link>
            <Link
              href="/delta-neutral"
              className="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-500 transition-colors"
            >
              델타 뉴트럴
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              총 자산 가치
            </h3>
            <p className="text-2xl font-bold text-white">
              ${stats.totalValue.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">총 PnL</h3>
            <p
              className={`text-2xl font-bold ${stats.totalPnL >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {stats.totalPnL >= 0 ? "+" : ""}${stats.totalPnL.toLocaleString()}
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">APY</h3>
            <p className="text-2xl font-bold text-yellow-400">{stats.apy}%</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-2">
              리스크 레벨
            </h3>
            <p
              className={`text-2xl font-bold ${getRiskColor(stats.riskLevel)}`}
            >
              {stats.riskLevel}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/portfolio" className="block">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-yellow-400 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    포트폴리오 확인
                  </h3>
                  <p className="text-gray-400">자산 현황 및 수익률 분석</p>
                </div>
                <div className="text-yellow-400 text-2xl">📊</div>
              </div>
            </div>
          </Link>

          <Link href="/delta-neutral" className="block">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-yellow-400 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    델타 뉴트럴 전략
                  </h3>
                  <p className="text-gray-400">포지션 밸런싱 및 리스크 관리</p>
                </div>
                <div className="text-yellow-400 text-2xl">⚖️</div>
              </div>
            </div>
          </Link>

          <Link href="/bridge" className="block">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-yellow-400 transition-colors cursor-pointer">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    브릿징 & 스왑
                  </h3>
                  <p className="text-gray-400">자산 이동 및 최적 경로</p>
                </div>
                <div className="text-yellow-400 text-2xl">🌉</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-4">최근 활동</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">ETH-PERP 롱 포지션 진입</span>
              </div>
              <span className="text-gray-400 text-sm">2시간 전</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">델타 뉴트럴 리밸런싱 알림</span>
              </div>
              <span className="text-gray-400 text-sm">4시간 전</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-gray-300">USDC 브릿징 완료</span>
              </div>
              <span className="text-gray-400 text-sm">6시간 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
