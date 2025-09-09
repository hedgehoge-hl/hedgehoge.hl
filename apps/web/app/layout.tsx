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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Hedgehog - Hedge Your Yield</title>
        <meta
          name="description"
          content="Hedge your assets, maximize your yield while staying neutral"
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers>
          {/* <Header /> */}
          <div className="fixed inset-0 w-screen h-screen">
            <div className="relative mx-auto w-full px-4 sm:px-6 md:px-8 h-full">
              {/* BG Lines */}
              <div className="h-px w-full bg-border absolute -z-0 left-0 top-2 sm:top-4 md:top-6" />
              <div className="h-px w-full bg-border absolute -z-0 bottom-2 sm:bottom-4 md:bottom-6 left-0" />
              <div className="w-px bg-border absolute -z-0 right-2 sm:right-4 md:right-6 h-full inset-y-0" />
              <div className="w-px bg-border absolute -z-0 left-2 sm:left-4 md:left-6 h-full inset-y-0" />

              <div className="relative z-5 h-full flex flex-col py-2 md:py-6 -mx-2">
                <Header />
                <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar scrolling">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
