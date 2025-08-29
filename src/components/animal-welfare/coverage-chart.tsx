"use client"

import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartData = [{ name: "Covered", value: 78, fill: "var(--color-covered)" }]

const chartConfig = {
  covered: {
    label: "Covered",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig

export function CoverageChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square max-h-[250px]"
    >
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            innerRadius={80}
            outerRadius={100}
            startAngle={90}
            endAngle={450}
            cy="50%"
            cornerRadius={50}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
             <Cell fill="hsl(var(--muted))" />
          </Pie>
           <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-5xl font-bold"
          >
            {chartData[0].value.toFixed(0)}%
          </text>
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
