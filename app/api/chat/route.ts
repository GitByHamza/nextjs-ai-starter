import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
    const { messages, chatId } = await req.json()
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return new Response('Unauthorized', { status: 401 })

    // 1. Credit Check Logic
    const { data: profile } = await supabase
        .from('profiles')
        .select('is_pro, credits')
        .eq('id', user.id)
        .single()

    if (!profile || (!profile.is_pro && profile.credits <= 0)) {
        return new Response('Insufficient credits', { status: 403 })
    }

    // Deduct credit if not pro
    if (!profile.is_pro) {
        await supabase.from('profiles').update({ credits: profile.credits - 1 }).eq('id', user.id)
    }

    // 2. Database Persistence Logic
    const latestMessage = messages[messages.length - 1]

    // Ensure conversation exists
    const { data: existingConv } = await supabase
        .from('conversations')
        .select('id')
        .eq('id', chatId)
        .single()

    if (!existingConv) {
        // Create new conversation, use first message as title
        const title = latestMessage.content.substring(0, 40) + '...'
        await supabase.from('conversations').insert({ id: chatId, user_id: user.id, title })
    }

    // Save User Message
    await supabase.from('messages').insert({
        conversation_id: chatId,
        role: 'user',
        content: latestMessage.content
    })

    // 3. AI Streaming Logic
    try {
        const result = await streamText({
            model: google('gemini-2.0-flash'),
            messages,
            async onFinish({ text }) {
                // Save AI Message when stream completes
                // Note: We create a fresh client here because the request context might be closed
                const supabaseAdmin = await createClient()
                await supabaseAdmin.from('messages').insert({
                    conversation_id: chatId,
                    role: 'assistant',
                    content: text
                })
            }
        })

        return result.toTextStreamResponse()
    } catch (error: any) {
        console.error('AI Error:', error)
        return new Response(error.message || 'An error occurred', { status: 500 })
    }
}