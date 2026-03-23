"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ChartData {
  day: string
  problems: number
  accuracy: number
}

interface ParentChartProps {
  data: ChartData[]
  type: "weekly" | "monthly"
}

export function ParentChart({ data, type }: ParentChartProps) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip formatter={(value, name) => [value, name === "problems" ? "Problems Solved" : "Accuracy %"]} />
          <Bar dataKey="problems" fill="#15803d" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
