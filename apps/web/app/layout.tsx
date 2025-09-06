import { Geist, Geist_Mono } from "next/font/google";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { Toaster } from "@workspace/ui/components/toaster";
import Header from "@/components/header";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <title>Hedgehoge.hl - Hyperliquid 델타 뉴트럴 대시보드</title>
        <meta
          name="description"
          content="Hyperliquid 기반 델타 뉴트럴 전략 대시보드"
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-black text-white`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
