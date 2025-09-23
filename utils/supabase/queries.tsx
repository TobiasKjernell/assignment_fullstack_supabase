import { createClient } from "./browser-client";
import { QueryData } from '@supabase/supabase-js';

export const getHomePosts = async () => {
    const supabase = createClient();
    
    return await supabase
    .from('posts')
    .select('id, title, slug, users(username, email)')
    .order('created_at', { ascending: false })

}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient();
    return await supabase.from('posts')
        .select('*, users(username)')
        .eq('slug', slug)
        .single();
}

export type HomePostsType = QueryData<ReturnType<typeof getHomePosts>>
export type SinglePostsType = QueryData<ReturnType<typeof getSinglePost>> 