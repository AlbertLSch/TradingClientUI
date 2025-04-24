import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, PieChart } from "lucide-react"
import StockChart from "@/components/stock-chart"
import Link from "next/link"

export default function PortfolioPage() {
  // Mock portfolio data
  const portfolioValue = 12345.67
  const portfolioChange = 305.42
  const portfolioChangePercent = 2.5

  const positions = [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      shares: 10,
      avgPrice: 165.32,
      currentPrice: 182.52,
      value: 1825.2,
      gain: 172.0,
      gainPercent: 10.4,
      chartData: [170, 172, 175, 173, 177, 180, 182],
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      shares: 5,
      avgPrice: 380.15,
      currentPrice: 415.32,
      value: 2076.6,
      gain: 175.85,
      gainPercent: 9.2,
      chartData: [400, 405, 410, 408, 412, 415, 415],
    },
    {
      symbol: "AMZN",
      name: "Amazon.com, Inc.",
      shares: 8,
      avgPrice: 160.45,
      currentPrice: 178.75,
      value: 1430.0,
      gain: 146.4,
      gainPercent: 11.4,
      chartData: [165, 168, 172, 170, 175, 177, 179],
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      shares: 12,
      avgPrice: 150.3,
      currentPrice: 164.2,
      value: 1970.4,
      gain: 166.8,
      gainPercent: 9.2,
      chartData: [160, 162, 163, 162, 163, 164, 164],
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      shares: 15,
      avgPrice: 190.25,
      currentPrice: 175.21,
      value: 2628.15,
      gain: -225.6,
      gainPercent: -7.9,
      chartData: [185, 182, 180, 178, 177, 176, 175],
    },
  ]

  const watchlist = [
    { symbol: "NVDA", name: "NVIDIA Corporation", price: 924.79, change: 4.8 },
    { symbol: "META", name: "Meta Platforms, Inc.", price: 485.58, change: 3.2 },
    { symbol: "NFLX", name: "Netflix, Inc.", price: 610.32, change: -2.7 },
    { symbol: "JPM", name: "JPMorgan Chase & Co.", price: 198.47, change: 0.7 },
  ]

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Portfolio</h1>
          <p className="text-muted-foreground">Track your investments and performance</p>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Portfolio Value</CardTitle>
            <CardDescription>Your total investment value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold">${portfolioValue.toFixed(2)}</span>
              <span className="ml-2 flex items-center text-green-500">
                <ArrowUp className="h-4 w-4 mr-1" />${portfolioChange.toFixed(2)} (+{portfolioChangePercent.toFixed(2)}
                %)
              </span>
            </div>
            <div className="h-[200px] mt-4">
              <StockChart
                data={[11500, 11600, 11700, 11650, 11800, 11900, 12000, 12100, 12050, 12200, 12300, 12345]}
                color="#22c55e"
                height={200}
              />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="positions" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="positions" className="flex-1">
              Positions
            </TabsTrigger>
            <TabsTrigger value="watchlist" className="flex-1">
              Watchlist
            </TabsTrigger>
            <TabsTrigger value="allocation" className="flex-1">
              Allocation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Positions</CardTitle>
                <CardDescription>Stocks you currently own</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {positions.map((position) => (
                    <Link href={`/stocks/${position.symbol}`} key={position.symbol}>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <span className="font-bold">{position.symbol}</span>
                            <span
                              className={`ml-2 text-xs px-1.5 py-0.5 rounded ${position.gainPercent >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                            >
                              {position.shares} shares
                            </span>
                          </div>
                          <span className="text-sm text-muted-foreground">{position.name}</span>
                          <span className="text-lg font-medium mt-1">${position.value.toFixed(2)}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className={position.gainPercent >= 0 ? "text-green-500" : "text-red-500"}>
                            {position.gainPercent >= 0 ? "+" : ""}
                            {position.gainPercent.toFixed(2)}%
                          </span>
                          <span className="text-sm text-muted-foreground">Avg: ${position.avgPrice.toFixed(2)}</span>
                          <div className="flex items-center mt-1">
                            <div className="w-24 h-12">
                              <StockChart
                                data={position.chartData}
                                color={position.gainPercent >= 0 ? "#22c55e" : "#ef4444"}
                                height={48}
                              />
                            </div>
                            <div className={`ml-2 ${position.gainPercent >= 0 ? "text-green-500" : "text-red-500"}`}>
                              {position.gainPercent >= 0 ? (
                                <ArrowUp className="h-4 w-4" />
                              ) : (
                                <ArrowDown className="h-4 w-4" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="watchlist" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Watchlist</CardTitle>
                <CardDescription>Stocks you're monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {watchlist.map((stock) => (
                    <Link href={`/stocks/${stock.symbol}`} key={stock.symbol}>
                      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                        <div>
                          <div className="font-bold">{stock.symbol}</div>
                          <div className="text-sm text-muted-foreground">{stock.name}</div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="font-medium">${stock.price.toFixed(2)}</div>
                          <div className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                            {stock.change >= 0 ? "+" : ""}
                            {stock.change}%
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="allocation" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>How your investments are distributed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center py-6">
                  <PieChart className="h-48 w-48 text-muted-foreground" />
                </div>
                <div className="space-y-4 mt-4">
                  {positions.map((position) => (
                    <div key={position.symbol} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full mr-2 ${
                            position.symbol === "AAPL"
                              ? "bg-green-500"
                              : position.symbol === "MSFT"
                                ? "bg-blue-500"
                                : position.symbol === "AMZN"
                                  ? "bg-orange-500"
                                  : position.symbol === "GOOGL"
                                    ? "bg-red-500"
                                    : "bg-purple-500"
                          }`}
                        />
                        <span>{position.symbol}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium">${position.value.toFixed(2)}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {((position.value / portfolioValue) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
