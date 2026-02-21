'use client'

import { useQuery } from '@tanstack/react-query'
import { createClient } from '@/lib/supabase/client'

export function useUserSubscription() {
    const supabase = createClient()

    return useQuery({
        queryKey: ['user-subscription'],
        queryFn: async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser()

            if (!user) return null

            const { data: profile, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single()

            if (error && error.code !== 'PGRST116') {
                console.error('Error fetching profile:', error)
                return null
            }

            if (error && error.code === 'PGRST116') {
                return {
                    user,
                    profile: {
                        is_pro: false,
                        credits: 10,
                    }
                }
            }

            return { user, profile }
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}
