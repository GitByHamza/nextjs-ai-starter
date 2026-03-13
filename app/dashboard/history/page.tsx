import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, History as HistoryIcon } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export default async function HistoryPage() {
    const supabase = await createClient()

    const { data: conversations } = await supabase
        .from('conversations')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="space-y-6 max-w-5xl pb-10">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Generation History</h1>
                <p className="text-muted-foreground mt-2">View all your past AI conversations.</p>
            </div>

            <Card>
                <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <HistoryIcon className="h-5 w-5 text-muted-foreground" /> Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="divide-y divide-border/50">
                        {!conversations || conversations.length === 0 ? (
                            <div className="p-8 text-center text-muted-foreground">
                                No conversations yet. Start chatting to see your history!
                            </div>
                        ) : (
                            conversations.map((chat) => (
                                <Link
                                    href={`/dashboard/chat/${chat.id}`}  // ✅ fixed path
                                    key={chat.id}
                                    className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <MessageSquare className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <p className="font-medium hover:underline">{chat.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(chat.created_at), { addSuffix: true })}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
