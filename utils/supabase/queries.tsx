
import { Category, PAGE_SIZE } from "../constants";
import { createClient } from "./browser-client";
import { QueryData } from '@supabase/supabase-js';
import { CommentRow } from "./helpers";

export const getAllPosts = async (supabase: ReturnType<typeof createClient>, page: number) => {
    if (!page) page = 1;
    const from: number = (page - 1) * PAGE_SIZE;
    const to: number = from + PAGE_SIZE - 1;

    return await supabase
        .from('posts')
        .select('id, title, slug, users(username, email), images, created_at, category', { count: 'exact' })
        .order('created_at', { ascending: false }).range(from, to);

}

export const getCategoryPosts = async (supabase: ReturnType<typeof createClient>, category: string, page: number) => {
    if (!page) page = 1;
    const from: number = (page - 1) * PAGE_SIZE;
    const to: number = from + PAGE_SIZE - 1;

    return await supabase
        .from('posts')
        .select('id, title, slug, users(username, email), images, created_at, category', { count: 'exact' })
        .eq('category', category)
        .order('created_at', { ascending: false }).range(from, to);

}

export const getSinglePost = async (slug: string) => {
    const supabase = createClient();
    return await supabase.from('posts')
        .select('*, users(username)')
        .eq('slug', slug)
        .single();
}

export const getSingleComment = async (commentId: number) => {
    const supabase = createClient();
    return await supabase.from('comment')
        .select('*, users(username)').eq('id', commentId).single();

}

export const getAllCategories = async () => {
    const supabase = createClient();
    return await supabase.from('posts')
        .select('category');

}

export const getComments = async (commentId: number, row: CommentRow) => {

    const supabase = createClient();
    return await supabase.from('comment')
        .select('*, users(username)').eq(row, commentId)

}

export const getSearchedPosts = async (searchTerm: string, signal: AbortSignal) => {
    const supabase = createClient();

    return await supabase.from('posts')
        .select('title, slug, category')
        .ilike('title', `%${searchTerm}%`).abortSignal(signal);
}

export const getAllUsersWithUsername = async (name: string) => {
    const supabase = createClient();
    return supabase.from('users').select('*').ilike('username', `%${name}`);
}

export const getUser = async () => {
    const supabase = await createClient();
    return await supabase.auth.getUser();
}

export type HomePostsType = QueryData<ReturnType<typeof getAllPosts>>
export type SinglePostsType = QueryData<ReturnType<typeof getSinglePost>>
export type CommentType = QueryData<ReturnType<typeof getComments>>
export type SingleCommentType = QueryData<ReturnType<typeof getSingleComment>>
export type GetUser = QueryData<ReturnType<typeof getUser>>