'use server'

import z from "zod";
import { commentSchema } from "./schemas";
import { createClient } from "../../utils/supabase/server-client";

import { redirect } from "next/navigation";

export const CreateCommentAction = async (commentData: z.infer<typeof commentSchema>) => {
    const parsedData = commentSchema.parse(commentData);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {        
        redirect('/auth/login')
    }

    if (parsedData.rootPost) {
        const { error } = await supabase.from('comment').insert([{ content: parsedData.content, rootPost: parsedData.rootPost, user_id: user.id }]);
        if (error) return { error: { message: error.message } };
    }

    if (parsedData.rootComment) {
        const { error } = await supabase.from('comment').insert([{ content: parsedData.content, rootComment: parsedData.rootComment, user_id: user.id }]);
        if (error) return { error: error.message };
    }

}