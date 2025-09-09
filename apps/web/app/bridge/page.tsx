"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/ui/components/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import InputNumber from "@/components/input-number";
import { Label } from "@workspace/ui/components/label";
import { Button } from "@workspace/ui/components/button";
import { ArrowDownUpIcon } from "lucide-react";

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

  const fetchRoutes = useCallback(async () => {
    setIsLoading(true);

    // TODO: Actual API call
    setTimeout(() => {
      setRoutes([
        {
          provider: "Jumper",
          fromChain: chains.find((c) => c.id === fromChain)?.name || "",
          toChain: chains.find((c) => c.id === toChain)?.name || "",
          fromToken,
          toToken,
          estimatedOutput: (parseFloat(amount) * 0.998).toFixed(2),
          estimatedTime: "5-10 min",
          fees: "0.2%",
        },
        {
          provider: "Pendle",
          fromChain: chains.find((c) => c.id === fromChain)?.name || "",
          toChain: chains.find((c) => c.id === toChain)?.name || "",
          fromToken,
          toToken,
          estimatedOutput: (parseFloat(amount) * 0.9995).toFixed(2),
          estimatedTime: "3-7 min",
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
          estimatedTime: "10-15 min",
          fees: "0.1%",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, [chains, fromChain, toChain, fromToken, toToken, amount]);

  useEffect(() => {
    if (amount && parseFloat(amount) > 0) {
      fetchRoutes();
    }
  }, [fromChain, toChain, fromToken, toToken, amount, fetchRoutes]);

  return (
    <div className="min-h-screen">
      {/* Header Content */}
      <div className="flex justify-between items-center mb-8">
        <div className="p-4">
          <Link
            href="/dashboard"
            className="text-muted-foreground text-sm hover:text-primary mb-2 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-primary">Bridge & Swap</h1>
          <p className="text-muted-foreground mt-2">
            Asset transfer and optimal route guidance
          </p>
        </div>
      </div>
      <div className="mx-auto px-4 space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Bridge Form */}
          <Card showCornerIcons className="p-2">
            <CardHeader>
              <CardTitle>Bridge Settings</CardTitle>
              <CardDescription>
                Set the source and destination chains and tokens for the bridge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* From Section */}
                <div>
                  <Label className="mb-2">From</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={fromChain} onValueChange={setFromChain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            {chain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Amount */}
                <div>
                  <InputNumber
                    label="Amount"
                    placeholder="0.00"
                    value={amount}
                    onChange={setAmount}
                    currency={fromToken}
                    currencySymbol="$"
                  />
                </div>

                {/* Swap Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      setFromChain(toChain);
                      setToChain(fromChain);
                      setFromToken(toToken);
                      setToToken(fromToken);
                    }}
                    variant="outline"
                  >
                    <ArrowDownUpIcon className="w-4 h-4" />
                  </Button>
                </div>

                {/* To Section */}
                <div>
                  <Label className="mb-2">To</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <Select value={toChain} onValueChange={setToChain}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Chain" />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            {chain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Optimal Routes */}
          <Card showCornerIcons className="p-2">
            <CardHeader>
              <CardTitle>Optimal Routes</CardTitle>
              <CardDescription>
                Find the optimal routes for your bridge.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Finding routes...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {routes.map((route, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-colors cursor-pointer hover:border-primary ${
                        index === 0
                          ? "border-primary bg-primary/5"
                          : "border-input"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">
                            {route.provider}
                          </span>
                          {route.apy && (
                            <span className="px-2 py-1 bg-green-400/10 text-green-400 text-xs rounded-full">
                              APY {route.apy}
                            </span>
                          )}
                          {index === 0 && (
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              Recommended
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {route.estimatedTime}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Expected Amount
                          </p>
                          <p className="text-foreground font-medium">
                            {route.estimatedOutput} {route.toToken}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Fees</p>
                          <p className="text-foreground">{route.fees}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {routes.length > 0 && !isLoading && (
                <Button className="w-full mt-6" size="lg">
                  Execute Bridge
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pendle Opportunities */}
        <Card showCornerIcons className="p-2">
          <CardHeader>
            <CardTitle>Pendle Yield Opportunities</CardTitle>
            <CardDescription>
              Find the optimal routes for your bridge.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-input rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">
                    PT-stETH-26DEC2024
                  </span>
                  <span className="text-green-400 font-bold">15.2% APY</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>TVL: $125M</p>
                  <p>Maturity: 2024-12-26</p>
                </div>
              </div>

              <div className="p-4 bg-input rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-foreground">
                    PT-ezETH-27JUN2024
                  </span>
                  <span className="text-green-400 font-bold">18.7% APY</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>TVL: $89M</p>
                  <p>Maturity: 2024-06-27</p>
                </div>
              </div>

              <div className="p-4 bg-input rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-white">
                    PT-weETH-26SEP2024
                  </span>
                  <span className="text-green-400 font-bold">13.4% APY</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>TVL: $67M</p>
                  <p>Maturity: 2024-09-26</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
