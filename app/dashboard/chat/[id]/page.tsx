import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ChatConversation from './chat-conversation'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ConversationPage({ params }: Props) {
    const { id } = await params
    const supabase = await createClient()

    // Verify conversation belongs to the current user (RLS handles security)
    const { data: conversation } = await supabase
        .from('conversations')
        .select('*')
        .eq('id', id)
        .single()

    if (!conversation) notFound()

    // Load all messages for this conversation
    const { data: messages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', id)
        .order('created_at', { ascending: true })

    // Shape messages to match Vercel AI SDK's Message format
    const initialMessages = (messages ?? []).map((m) => ({
        id: m.id,
        role: m.role as 'user' | 'assistant',
        content: m.content,
    }))

    return <ChatConversation chatId={id} initialMessages={initialMessages} />
}
