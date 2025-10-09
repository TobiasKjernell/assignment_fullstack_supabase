'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../../utils/supabase/server-client"
import { slugify } from "../../utils/slugify"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export const EditPost = async ({ postId, updatedData }: { postId: number, updatedData: z.infer<typeof postSchema> }) => {
    const parsedData = postSchema.parse(updatedData);
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    const { data: post, error } = await supabase.from('posts').select('*').eq('id', postId).single();
    if (error) return { error: error.message }
    if (!user || user.id !== post?.user_id) return { error: 'Not Authorised' }

    const { data: updatedPost, error: updateError } = await supabase.from('posts').update({ content: parsedData.content, title: parsedData.title, slug: slugify(parsedData.title) }).eq('id', postId).select('slug').single();
    if(updateError) return {error: updateError.message}

    revalidatePath('/');            
    redirect(`/${updatedPost.slug}`);
}   