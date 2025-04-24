import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockCard } from "@/components/stock-card"

export default function StocksPage() {
  // Mock stock data
  const popularStocks = [
    { symbol: "AAPL", name: "Apple Inc.", price: 182.52, change: 1.2, chartData: [170, 172, 175, 173, 177, 180, 182] },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      price: 415.32,
      change: 0.8,
      chartData: [400, 405, 410, 408, 412, 415, 415],
    },
    {
      symbol: "AMZN",
      name: "Amazon.com, Inc.",
      price: 178.75,
      change: 2.3,
      chartData: [165, 168, 172, 170, 175, 177, 179],
    },
    {
      symbol: "GOOGL",
      name: "Alphabet Inc.",
      price: 164.2,
      change: 0.5,
      chartData: [160, 162, 163, 162, 163, 164, 164],
    },
    {
      symbol: "META",
      name: "Meta Platforms, Inc.",
      price: 485.58,
      change: 3.2,
      chartData: [450, 460, 470, 465, 475, 480, 486],
    },
    {
      symbol: "TSLA",
      name: "Tesla, Inc.",
      price: 175.21,
      change: -2.1,
      chartData: [185, 182, 180, 178, 177, 176, 175],
    },
    {
      symbol: "NVDA",
      name: "NVIDIA Corporation",
      price: 924.79,
      change: 4.8,
      chartData: [880, 890, 900, 910, 915, 920, 925],
    },
    {
      symbol: "NFLX",
      name: "Netflix, Inc.",
      price: 610.32,
      change: -2.7,
      chartData: [630, 625, 620, 615, 612, 611, 610],
    },
  ]

  const techStocks = popularStocks.slice(0, 5)
  const financeStocks = [
    {
      symbol: "JPM",
      name: "JPMorgan Chase & Co.",
      price: 198.47,
      change: 0.7,
      chartData: [195, 196, 197, 196, 197, 198, 198],
    },
    {
      symbol: "BAC",
      name: "Bank of America Corp.",
      price: 38.75,
      change: -0.3,
      chartData: [39, 38.8, 38.7, 38.6, 38.7, 38.8, 38.7],
    },
    {
      symbol: "WFC",
      name: "Wells Fargo & Co.",
      price: 59.32,
      change: 1.1,
      chartData: [58, 58.2, 58.5, 58.7, 59, 59.2, 59.3],
    },
    {
      symbol: "GS",
      name: "Goldman Sachs Group Inc.",
      price: 437.89,
      change: 0.9,
      chartData: [430, 432, 435, 434, 436, 437, 438],
    },
  ]

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Stocks</h1>
        <div className="w-full max-w-sm">
          <Input type="search" placeholder="Search for stocks..." className="w-full" />
        </div>

        <Tabs defaultValue="popular" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="tech">Technology</TabsTrigger>
            <TabsTrigger value="finance">Finance</TabsTrigger>
          </TabsList>
          <TabsContent value="popular" className="space-y-4">
            {popularStocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                chartData={stock.chartData}
              />
            ))}
          </TabsContent>
          <TabsContent value="tech" className="space-y-4">
            {techStocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                chartData={stock.chartData}
              />
            ))}
          </TabsContent>
          <TabsContent value="finance" className="space-y-4">
            {financeStocks.map((stock) => (
              <StockCard
                key={stock.symbol}
                symbol={stock.symbol}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                chartData={stock.chartData}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
