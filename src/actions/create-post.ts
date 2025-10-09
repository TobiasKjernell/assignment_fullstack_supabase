'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../../utils/supabase/server-client";
import { slugify } from "../../utils/slugify";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../../utils/supabase/upload-image";
import { redirect } from "next/navigation";
import { DatabaseAction } from "../../utils/supabase/helpers";



export const CreatePostAction = async (postDataValues: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(postDataValues);
    const slug = slugify(parsedData.title);
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not Authorized' }

    const { data } = await supabase.from('posts').select('slug').eq('slug', slug).single()
    if (data?.slug) return { error: 'Post title already taken..' }

    const imageFile = postDataValues.images!.get('image');
    if (!(imageFile instanceof File) && imageFile !== null) return { error: 'Malformed image file' }
    const imagePublicUrl = imageFile ? await uploadImage(imageFile) : null;

    await supabase.from
        ('posts').insert([{ ...parsedData, user_id: user.id, slug, images: imagePublicUrl }]);


    revalidatePath('/');    
    redirect(`/${slug}`);


}       