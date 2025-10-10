'use server'

import z from "zod";
import { commentSchema } from "./schemas";
import { createClient } from "../../utils/supabase/server-client";

export const CreateCommentAction = async (commentData: z.infer<typeof commentSchema>) => {
    const parsedData = commentSchema.parse(commentData);
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not Authorized' }

    //skickar upp egen
    const { data, error } = await supabase.from('comment').insert([{ content: parsedData.content, rootEntity: parsedData.rootEntity, user_id: user.id }]).select().single();

    if (error) throw error;

    let updateArray: number[] = []
    if (parsedData.rootEntity) {
        const { data: currentPostComments, error } = await supabase.from('posts').select('comments').eq('id', parsedData.rootEntity).single();
        if (error) throw error;

        if (currentPostComments.comments)
            updateArray = [...currentPostComments.comments!, data.id]
        else updateArray = [data.id]

        await supabase.from('posts').update({ comments: updateArray }).eq('id', parsedData.rootEntity).throwOnError()
    }
    else {

        const { data: currentPostComments, error } = await supabase.from('comment').select('replies').eq('id', parsedData.childEntity!).single();

        if (currentPostComments?.replies)   
            updateArray = [...currentPostComments.replies, data.id,]
        else updateArray = [data.id]

        console.log(parsedData.childEntity)
        await supabase.from('comment').update({ replies: updateArray }).eq('id', parsedData.childEntity!).throwOnError();

    }
}