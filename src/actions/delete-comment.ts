'use server'

import { createClient } from "../../utils/supabase/server-client"

export const DeleteComment = async(commentIds:number[]) => {
    const supabase = await createClient();
    await supabase.from('comment').delete().in('id', commentIds).throwOnError();
}               