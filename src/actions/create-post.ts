'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../../utils/supabase/server-client";
import { slugify } from "../../utils/slugify";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const CreatePostAction = async (postDataValues: z.infer<typeof postSchema>) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser()
    const parsedData = postSchema.parse(postDataValues);
    const slug = slugify(parsedData.title);

    if (!user) throw new Error('Not Authorized')

    await supabase.from('posts').insert([{ user_id: user.id, slug, ...parsedData }]).throwOnError()

    revalidatePath('/');
    redirect(`/${slug}`);
}