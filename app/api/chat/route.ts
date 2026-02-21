import { streamText } from 'ai'
import { google } from '@ai-sdk/google'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
    const { messages } = await req.json()
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return new Response('Unauthorized', { status: 401 })
    }

    // Check credits or pro status
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
        await supabase
            .from('profiles')
            .update({ credits: profile.credits - 1 })
            .eq('id', user.id)
    }

    try {
        const result = await streamText({
            model: google('gemini-2.0-flash'),
            messages,
        })

        return result.toTextStreamResponse()
    } catch (error: any) {
        console.error('AI Error:', error)
        return new Response(error.message || 'An error occurred', { status: 500 })
    }
}
