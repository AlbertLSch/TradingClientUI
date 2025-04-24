import Link from "next/link"
import { ArrowDown, ArrowUp } from "lucide-react"
import StockChart from "@/components/stock-chart"

interface StockCardProps {
  symbol: string
  name: string
  price: number
  change: number
  chartData: number[]
}

export function StockCard({ symbol, name, price, change, chartData }: StockCardProps) {
  const isPositive = change >= 0

  return (
    <Link href={`/stocks/${symbol}`}>
      <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="font-bold">{symbol}</span>
            <span
              className={`ml-2 text-xs px-1.5 py-0.5 rounded ${isPositive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </div>
          <span className="text-sm text-muted-foreground">{name}</span>
          <span className="text-lg font-medium mt-1">${price.toFixed(2)}</span>
        </div>
        <div className="flex items-center">
          <div className="w-24 h-12">
            <StockChart data={chartData} color={isPositive ? "#22c55e" : "#ef4444"} height={48} />
          </div>
          <div className={`ml-2 ${isPositive ? "text-green-500" : "text-red-500"}`}>
            {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </div>
        </div>
      </div>
    </Link>
  )
}
