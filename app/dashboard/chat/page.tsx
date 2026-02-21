'use client'

import { useChat } from '@ai-sdk/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Send, Paperclip, Bot, User, Loader2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useUserSubscription } from '@/lib/hooks/use-user-subscription'

export default function ChatPage() {
    // Cast options to any to avoid strict type checks on 'api' if it was renamed
    // Cast return to any as definitions seem to strictly omit input/handleInputChange but we need to check runtime behavior or adapt
    // Adapting to manual input management based on type definition
    const chat = useChat({
        api: '/api/chat',
    } as any)

    // Destructure what we know exists or might exist
    const { messages, status, sendMessage, append, error } = chat as any

    const [input, setInput] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const { data: subscription } = useUserSubscription()

    // Derive isLoading
    const isLoading = status === 'streaming' || status === 'submitted'

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return

        const content = input
        setInput('')

        // Try append first as it is standard in previous versions, fallback to sendMessage
        if (append) {
            await append({ role: 'user', content })
        } else if (sendMessage) {
            await sendMessage({ role: 'user', content })
        } else {
            console.error('No send method found in useChat return', chat)
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.32))] md:h-[calc(100vh-theme(spacing.24))] max-w-4xl mx-auto">
            <Card className="flex-1 overflow-hidden flex flex-col border-0 shadow-none bg-transparent">
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-8 opacity-50">
                            <Bot className="h-12 w-12 mb-4" />
                            <h3 className="font-semibold text-lg">AI Assistant Ready</h3>
                            <p>Ask anything to start the conversation.</p>
                        </div>
                    )}

                    {messages.map((m: any) => (
                        <div key={m.id} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {m.role !== 'user' && (
                                <Avatar className="h-8 w-8 border">
                                    <AvatarImage src="/bot-avatar.png" />
                                    <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                            )}
                            <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm ${m.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted border'
                                }`}>
                                {m.content}
                            </div>
                            {m.role === 'user' && (
                                <Avatar className="h-8 w-8 border">
                                    <AvatarImage src={subscription?.user.user_metadata?.avatar_url} />
                                    <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                                </Avatar>
                            )}
                        </div>
                    ))}

                    {isLoading && messages[messages.length - 1]?.role === 'user' && (
                        <div className="flex gap-3 justify-start">
                            <Avatar className="h-8 w-8 border">
                                <AvatarFallback><Bot className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                            <div className="rounded-lg px-4 py-2 bg-muted border text-sm flex items-center">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Thinking...
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky bottom-0 z-10">
                    {error && (
                        <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                            <span className="font-bold">Error:</span> {error.message}
                            <br />
                            <span className="text-xs opacity-80">Check your API keys and quota.</span>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex gap-2 relative">
                        <Button type="button" variant="outline" size="icon" className="shrink-0">
                            <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="flex-1 pr-12"
                            autoFocus
                        />
                        <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="absolute right-0">
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-muted-foreground">
                            AI can make mistakes. Check important info.
                        </span>
                    </div>
                </div>
            </Card>
        </div>
    )
}
