"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LineChart, Search, Settings, Wallet } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/stocks", label: "Stocks", icon: LineChart },
    { href: "/search", label: "Search", icon: Search },
    { href: "/portfolio", label: "Portfolio", icon: Wallet },
    { href: "/settings", label: "Settings", icon: Settings },
  ]

  return (
    <div className="sticky top-0 z-10 w-full bg-background border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <LineChart className="h-6 w-6 text-green-500" />
            <span className="font-bold">TradingClient</span>
          </Link>
        </div>
        <nav className="hidden md:flex flex-1 items-center justify-center space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md",
                pathname === item.href
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="md:hidden flex-1 flex justify-between">
          <Link href="/" className="flex items-center">
            <LineChart className="h-6 w-6 text-green-500" />
            <span className="font-bold ml-2">TradingClient</span>
          </Link>
        </div>
      </div>
      <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t">
        <div className="grid h-full grid-cols-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center",
                pathname === item.href ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
