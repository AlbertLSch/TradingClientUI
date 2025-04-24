"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { StockCard } from "@/components/stock-card"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock stock data
  const allStocks = [
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

  // Filter stocks based on search query
  const filteredStocks = searchQuery
    ? allStocks.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : []

  return (
    <div className="container px-4 py-6 md:px-6 md:py-8">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Search</h1>
          <p className="text-muted-foreground">Find stocks to add to your portfolio or watchlist</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by company name or symbol..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          <div className="space-y-4">
            {filteredStocks.length > 0 ? (
              filteredStocks.map((stock) => (
                <StockCard
                  key={stock.symbol}
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.price}
                  change={stock.change}
                  chartData={stock.chartData}
                />
              ))
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-center text-muted-foreground">No stocks found matching "{searchQuery}"</p>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Popular Searches</CardTitle>
              <CardDescription>Trending stocks people are searching for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {allStocks.slice(0, 6).map((stock) => (
                  <div
                    key={stock.symbol}
                    className="flex items-center p-3 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer"
                    onClick={() => setSearchQuery(stock.symbol)}
                  >
                    <div>
                      <div className="font-bold">{stock.symbol}</div>
                      <div className="text-xs text-muted-foreground">{stock.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
