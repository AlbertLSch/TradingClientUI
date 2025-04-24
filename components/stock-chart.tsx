"use client"

import { useEffect, useRef } from "react"

interface StockChartProps {
  data: number[]
  color: string
  height?: number
}

export default function StockChart({ data, color, height = 80 }: StockChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw chart
    const drawChart = () => {
      if (!ctx || !canvas) return

      const width = rect.width
      const chartHeight = rect.height

      // Find min and max values
      const minValue = Math.min(...data)
      const maxValue = Math.max(...data)
      const valueRange = maxValue - minValue

      // Calculate x and y coordinates
      const points = data.map((value, index) => ({
        x: (index / (data.length - 1)) * width,
        y: chartHeight - ((value - minValue) / valueRange) * chartHeight * 0.8 - chartHeight * 0.1,
      }))

      // Draw line
      ctx.beginPath()
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y)
      }

      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw area under the line
      ctx.lineTo(points[points.length - 1].x, chartHeight)
      ctx.lineTo(points[0].x, chartHeight)
      ctx.closePath()

      // Create gradient fill
      const gradient = ctx.createLinearGradient(0, 0, 0, chartHeight)
      gradient.addColorStop(0, `${color}33`) // 20% opacity
      gradient.addColorStop(1, `${color}05`) // 5% opacity

      ctx.fillStyle = gradient
      ctx.fill()
    }

    drawChart()

    // Handle resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
      drawChart()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [data, color])

  return <canvas ref={canvasRef} style={{ width: "100%", height: `${height}px` }} />
}
