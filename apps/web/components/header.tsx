import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl">🦔</div>
            <span className="text-xl font-bold text-yellow-400">
              Hedgehoge.hl
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              대시보드
            </Link>
            <Link
              href="/portfolio"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              포트폴리오
            </Link>
            <Link
              href="/delta-neutral"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              델타 뉴트럴
            </Link>
            <Link
              href="/bridge"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
            >
              브릿징
            </Link>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-500 transition-colors">
              지갑 연결
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
