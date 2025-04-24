"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Bell, ChevronLeft, Clock, DollarSign, Share2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import StockChart from "@/components/stock-chart"

// Mock data for different time periods
const mockChartData = {
  "1D": Array.from({ length: 24 }, (_, i) => 150 + Math.random() * 10 - 5 + i * 0.5),
  "1W": Array.from({ length: 7 }, (_, i) => 150 + Math.random() * 15 - 7.5 + i * 1),
  "1M": Array.from({ length: 30 }, (_, i) => 150 + Math.random() * 20 - 10 + i * 0.7),
  "3M": Array.from({ length: 90 }, (_, i) => 150 + Math.random() * 30 - 15 + i * 0.3),
  "1Y": Array.from({ length: 365 }, (_, i) => 150 + Math.random() * 50 - 25 + i * 0.1),
  ALL: Array.from({ length: 1000 }, (_, i) => 100 + Math.random() * 10 - 5 + i * 0.08),
}

// Mock stock data
const stockData = {
  AAPL: {
    name: "Apple Inc.",
    price: 182.52,
    change: 2.15,
    changePercent: 1.2,
    marketCap: "2.87T",
    peRatio: 30.25,
    dividend: 0.92,
    volume: "58.3M",
    avgVolume: "62.5M",
    high: 183.12,
    low: 180.17,
    open: 180.42,
    prevClose: 180.37,
    yearHigh: 198.23,
    yearLow: 143.9,
  },
  MSFT: {
    name: "Microsoft Corporation",
    price: 415.32,
    change: 3.28,
    changePercent: 0.8,
    marketCap: "3.09T",
    peRatio: 35.62,
    dividend: 0.68,
    volume: "22.1M",
    avgVolume: "25.7M",
    high: 416.78,
    low: 412.45,
    open: 413.2,
    prevClose: 412.04,
    yearHigh: 420.82,
    yearLow: 309.45,
  },
  AMZN: {
    name: "Amazon.com, Inc.",
    price: 178.75,
    change: 4.02,
    changePercent: 2.3,
    marketCap: "1.85T",
    peRatio: 61.23,
    dividend: 0,
    volume: "32.7M",
    avgVolume: "35.2M",
    high: 179.35,
    low: 175.12,
    open: 175.68,
    prevClose: 174.73,
    yearHigh: 185.1,
    yearLow: 118.35,
  },
}

export default function StockDetailPage({ params }: { params: { symbol: string } }) {
  const { symbol } = params
  const [timeframe, setTimeframe] = useState<keyof typeof mockChartData>("1D")
  const [quantity, setQuantity] = useState(1)

  // Get stock data or use AAPL as fallback
  const stock = stockData[symbol as keyof typeof stockData] || stockData.AAPL
  const isPositive = stock.changePercent >= 0

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center">
          <Link href="/stocks" className="mr-4">
            <Button variant="ghost" size="icon">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{symbol}</h1>
            <p className="text-muted-foreground">{stock.name}</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">${stock.price.toFixed(2)}</span>
            <span className={`ml-2 flex items-center ${isPositive ? "text-green-500" : "text-red-500"}`}>
              {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
              {isPositive ? "+" : ""}
              {stock.change.toFixed(2)} ({isPositive ? "+" : ""}
              {stock.changePercent.toFixed(2)}%)
            </span>
          </div>
          <div className="text-sm text-muted-foreground flex items-center">
            <Clock className="h-3 w-3 mr-1" /> Last updated: Today, 16:00 EDT
          </div>
        </div>

        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div className="h-[300px] w-full">
              <StockChart data={mockChartData[timeframe]} color={isPositive ? "#22c55e" : "#ef4444"} height={300} />
            </div>
            <div className="flex justify-between mt-4">
              {(Object.keys(mockChartData) as Array<keyof typeof mockChartData>).map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className={
                    timeframe === period
                      ? isPositive
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                      : ""
                  }
                >
                  {period}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="overview" className="flex-1">
              Overview
            </TabsTrigger>
            <TabsTrigger value="trade" className="flex-1">
              Trade
            </TabsTrigger>
            <TabsTrigger value="news" className="flex-1">
              News
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Market Cap</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">${stock.marketCap}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">P/E Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{stock.peRatio}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Dividend Yield</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{stock.dividend}%</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Volume</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-medium">{stock.volume}</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Key Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Open</p>
                    <p className="font-medium">${stock.open.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previous Close</p>
                    <p className="font-medium">${stock.prevClose.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Day's High</p>
                    <p className="font-medium">${stock.high.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Day's Low</p>
                    <p className="font-medium">${stock.low.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">52 Week High</p>
                    <p className="font-medium">${stock.yearHigh.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">52 Week Low</p>
                    <p className="font-medium">${stock.yearLow.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Volume</p>
                    <p className="font-medium">{stock.avgVolume}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trade" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Trade {symbol}</CardTitle>
                <CardDescription>Buy or sell shares of {stock.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      className="w-[48%] bg-green-500/10 hover:bg-green-500/20 text-green-700 border-green-200"
                    >
                      Buy
                    </Button>
                    <Button
                      variant="outline"
                      className="w-[48%] bg-red-500/10 hover:bg-red-500/20 text-red-700 border-red-200"
                    >
                      Sell
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Quantity</span>
                      <span className="text-sm font-medium">${(stock.price * quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        -
                      </Button>
                      <span className="font-medium">{quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                        +
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Buy {quantity} Share{quantity > 1 ? "s" : ""}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Latest News</CardTitle>
                <CardDescription>Recent news about {stock.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <p className="text-sm text-muted-foreground">Today, 10:45 AM</p>
                    <h3 className="font-medium mt-1">{symbol} Reports Strong Quarterly Earnings, Beats Expectations</h3>
                    <p className="text-sm mt-1 text-muted-foreground">
                      {stock.name} reported quarterly earnings that exceeded analyst expectations, driven by strong
                      product sales and services growth.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM</p>
                    <h3 className="font-medium mt-1">{symbol} Announces New Product Line, Shares Rise</h3>
                    <p className="text-sm mt-1 text-muted-foreground">
                      {stock.name} unveiled its latest product lineup at a special event, causing shares to rise by 2%
                      in afternoon trading.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                    <h3 className="font-medium mt-1">Analysts Raise Price Target for {symbol} Stock</h3>
                    <p className="text-sm mt-1 text-muted-foreground">
                      Several Wall Street analysts have raised their price targets for {symbol}, citing strong growth
                      prospects and market position.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
