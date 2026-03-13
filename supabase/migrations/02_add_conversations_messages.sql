-- Migration: 02_add_conversations_messages.sql
-- Creates conversations and messages tables used by /api/chat and /dashboard/history

-- ============================================================
-- CONVERSATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.conversations (
    id          uuid PRIMARY KEY,               -- client-generated via crypto.randomUUID()
    user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title       text NOT NULL DEFAULT 'New Conversation',
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- Index for fetching a user's conversations sorted by date (used in history page)
CREATE INDEX IF NOT EXISTS conversations_user_id_created_at_idx
    ON public.conversations (user_id, created_at DESC);

-- RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own conversations"
    ON public.conversations FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own conversations"
    ON public.conversations FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own conversations"
    ON public.conversations FOR DELETE
    USING (auth.uid() = user_id);


-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id     uuid NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    role                text NOT NULL CHECK (role IN ('user', 'assistant')),
    content             text NOT NULL,
    created_at          timestamptz NOT NULL DEFAULT now()
);

-- Index for loading all messages in a conversation ordered by time
CREATE INDEX IF NOT EXISTS messages_conversation_id_created_at_idx
    ON public.messages (conversation_id, created_at ASC);

-- RLS — users can only access messages that belong to their own conversations
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their own conversations"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE conversations.id = messages.conversation_id
            AND conversations.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert messages into their own conversations"
    ON public.messages FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.conversations
            WHERE conversations.id = messages.conversation_id
            AND conversations.user_id = auth.uid()
        )
    );
