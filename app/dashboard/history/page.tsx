"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, History as HistoryIcon, MessageSquare, Code, Image as ImageIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const MOCK_HISTORY = [
    {
        id: "1",
        title: "Landing Page Copywriting",
        type: "text",
        icon: MessageSquare,
        date: "Today, 10:42 AM",
        tokens: 450,
        status: "success"
    },
    {
        id: "2",
        title: "React Dashboard Component",
        type: "code",
        icon: Code,
        date: "Yesterday, 4:15 PM",
        tokens: 1200,
        status: "success"
    },
    {
        id: "3",
        title: "Blog Post Outline: Next.js 15",
        type: "text",
        icon: MessageSquare,
        date: "Oct 24, 2026",
        tokens: 320,
        status: "success"
    },
    {
        id: "4",
        title: "Hero Background Artifact",
        type: "image",
        icon: ImageIcon,
        date: "Oct 22, 2026",
        tokens: null,
        status: "failed"
    },
    {
        id: "5",
        title: "API Integration Draft",
        type: "code",
        icon: Code,
        date: "Oct 20, 2026",
        tokens: 850,
        status: "success"
    }
]

export default function HistoryPage() {
    return (
        <div className="space-y-6 max-w-5xl pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Generation History</h1>
                    <p className="text-muted-foreground mt-2">
                        View and manage all your past AI generation requests.
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search history..."
                        className="w-full pl-8 bg-background"
                    />
                </div>
                <Button variant="outline" size="icon" className="shrink-0">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <HistoryIcon className="h-5 w-5 text-muted-foreground" /> Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                        {MOCK_HISTORY.map((item) => (
                            <div key={item.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-muted/10 transition-colors">
                                <div className="flex items-center gap-4 cursor-pointer">
                                    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center">
                                        <item.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium leading-none hover:underline">{item.title}</p>
                                        <p className="text-xs text-muted-foreground">{item.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:ml-auto shrink-0">
                                    {item.status === "failed" ? (
                                        <Badge variant="destructive" className="bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-none border-none">Failed</Badge>
                                    ) : (
                                        <>
                                            {item.tokens && (
                                                <span className="text-xs text-muted-foreground tabular-nums">
                                                    {item.tokens} tokens
                                                </span>
                                            )}
                                            <Badge variant="secondary" className="shadow-none leading-none pt-1">Completed</Badge>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center pt-4">
                <Button variant="outline" size="sm">Load More</Button>
            </div>
        </div>
    )
}
