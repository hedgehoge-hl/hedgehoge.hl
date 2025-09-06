import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Hedgehoge.hl
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Hyperliquid 기반 델타 뉴트럴 전략 대시보드
          </p>
          <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            포트폴리오를 확인하고, 델타 뉴트럴 포지션을 쉽게 구축하며,
            브릿징·스왑·라우팅을 통해 유동성을 효율적으로 관리하세요.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              대시보드 시작하기
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
            >
              포트폴리오 확인
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-400">
            주요 기능
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-yellow-400 text-2xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                포트폴리오 체커
              </h3>
              <p className="text-gray-300">
                Hyperliquid API 연동으로 실시간 자산 상태, PnL, 포지션 현황을
                확인하고 수익률(APY)을 시각화합니다.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-yellow-400 text-2xl mb-4">⚖️</div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                델타 뉴트럴 전략
              </h3>
              <p className="text-gray-300">
                현물/선물 간 포지션 밸런싱으로 델타 뉴트럴 포지션을 자동
                계산하고 청산 리스크를 실시간 모니터링합니다.
              </p>
            </div>

            <div className="bg-gray-900 p-8 rounded-lg border border-gray-800">
              <div className="text-yellow-400 text-2xl mb-4">🌉</div>
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                브릿징 & 스왑
              </h3>
              <p className="text-gray-300">
                Jumper, Pendle API 연동으로 자산 이동 및 수익 최적화 경로를
                제공하여 효율적인 유동성 관리를 지원합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
