"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
    { name: "Jan", sales: 1200, customers: 300, products: 12 },
    { name: "Feb", sales: 2100, customers: 450, products: 18 },
    { name: "Mar", sales: 1800, customers: 400, products: 24 },
    { name: "Apr", sales: 2400, customers: 600, products: 28 },
    { name: "May", sales: 3200, customers: 850, products: 42 },
    { name: "Jun", sales: 4100, customers: 1100, products: 58 },
]

export function OverviewChart() {
    return (
        <Card className="col-span-full xl:col-span-4 bg-muted/20 border-border/50">
            <CardHeader>
                <CardTitle>Growth Overview</CardTitle>
                <CardDescription>
                    Monthly performance of sales, customers, and AI products generated.
                </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 10,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground)/0.2)" />
                        <XAxis
                            dataKey="name"
                            stroke="#ffffff"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            stroke="#ffffff"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                            dx={-10}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: "hsl(var(--background))",
                                border: "1px solid hsl(var(--border))",
                                borderRadius: "8px",
                                fontSize: "12px",
                            }}
                            itemStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Area
                            type="monotone"
                            dataKey="sales"
                            stroke="#8b5cf6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorSales)"
                            name="Revenue ($)"
                        />
                        <Area
                            type="monotone"
                            dataKey="customers"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorCustomers)"
                            name="Active Customers"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    )
}
