import Link from "next/link"
import { ArrowUpRight, TrendingUp, Wallet } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import StockChart from "@/components/stock-chart"
import { StockCard } from "@/components/stock-card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-6 md:py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:gap-12">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                  <p className="text-muted-foreground">Track your investments and discover new opportunities.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
                      <Wallet className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$12,345.67</div>
                      <p className="text-xs text-green-500 flex items-center mt-1">
                        +2.5% <ArrowUpRight className="ml-1 w-3 h-3" />
                      </p>
                      <div className="mt-4 h-[80px]">
                        <StockChart
                          data={[
                            1200, 1250, 1280, 1300, 1260, 1290, 1340, 1380, 1350, 1400, 1450, 1500, 1550, 1600, 1650,
                            1700, 1750, 1800, 1850, 1900, 1950, 2000, 2050, 2100, 2150, 2200, 2250, 2300, 2350, 2400,
                          ]}
                          color="#22c55e"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
                      <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="font-medium">AAPL</div>
                          <div className="text-green-500">+1.2%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">MSFT</div>
                          <div className="text-green-500">+0.8%</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="font-medium">TSLA</div>
                          <div className="text-red-500">-2.1%</div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="w-full mt-4">
                        <Link href="/stocks" className="flex items-center">
                          View all <ArrowUpRight className="ml-1 w-3 h-3" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Performance</CardTitle>
                    <CardDescription>Your top performing stocks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <StockCard
                        symbol="AAPL"
                        name="Apple Inc."
                        price={182.52}
                        change={1.2}
                        chartData={[170, 172, 175, 173, 177, 180, 182]}
                      />
                      <StockCard
                        symbol="MSFT"
                        name="Microsoft Corporation"
                        price={415.32}
                        change={0.8}
                        chartData={[400, 405, 410, 408, 412, 415, 415]}
                      />
                      <StockCard
                        symbol="AMZN"
                        name="Amazon.com, Inc."
                        price={178.75}
                        change={2.3}
                        chartData={[165, 168, 172, 170, 175, 177, 179]}
                      />
                    </div>
                    <Button variant="outline" className="w-full mt-6">
                      <Link href="/portfolio" className="flex items-center justify-center w-full">
                        View Portfolio
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Market Overview</CardTitle>
                    <CardDescription>Today's market summary</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <div>S&P 500</div>
                        <div className="text-green-500">+0.75%</div>
                      </div>
                      <div className="flex justify-between">
                        <div>NASDAQ</div>
                        <div className="text-green-500">+1.02%</div>
                      </div>
                      <div className="flex justify-between">
                        <div>DOW JONES</div>
                        <div className="text-green-500">+0.43%</div>
                      </div>
                      <div className="flex justify-between">
                        <div>RUSSELL 2000</div>
                        <div className="text-red-500">-0.12%</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Top Movers</CardTitle>
                    <CardDescription>Biggest price changes today</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="font-medium">NVDA</div>
                        <div className="text-green-500">+4.8%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-medium">META</div>
                        <div className="text-green-500">+3.2%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-medium">NFLX</div>
                        <div className="text-red-500">-2.7%</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="font-medium">PYPL</div>
                        <div className="text-red-500">-3.1%</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-4">
                      <Link href="/stocks" className="flex items-center">
                        View all stocks <ArrowUpRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
