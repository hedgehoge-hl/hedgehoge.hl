import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Hedgehog
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Hedge your assets, maximize your yield while staying neutral
          </p>
          {/* <p className="text-lg mb-12 text-gray-400 max-w-2xl mx-auto">
            Monitor your portfolio, easily build delta neutral positions by
            exectuing short positions, buying, bridging, swapping, and routing
            your spot assets.
          </p> */}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/delta-neutral"
              className="px-8 py-4 border border-yellow-400 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-400 hover:text-black transition-colors"
            >
              Delta Neutral Strategy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
