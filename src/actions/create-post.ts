'use server'

import z from "zod"
import { postSchema } from "./schemas"
import { createClient } from "../../utils/supabase/server-client";
import { slugify } from "../../utils/slugify";
import { revalidatePath } from "next/cache";
import { uploadImages } from "../../utils/supabase/upload-image";
import { redirect } from "next/navigation";

export const CreatePostAction = async (postDataValues: z.infer<typeof postSchema>) => {
    const parsedData = postSchema.parse(postDataValues);
    const slug = slugify(parsedData.title);
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { error: 'Not Authorized' }

    const { data } = await supabase.from('posts').select('slug').eq('slug', slug).single()
    if (data?.slug) return { error: 'Post title already taken..' }

    const imageFiles = postDataValues.images!.getAll('image');
    const isValid = postSchema.safeParse(postDataValues);

    if (!isValid.success) return { error: 'Malformed informations' }

    const imagePublicUrls = imageFiles && imageFiles.length > 0 ? await uploadImages(imageFiles as File[]) : null;

    await supabase.from
        ('posts').insert([{ ...parsedData, user_id: user.id, slug, images: imagePublicUrls }]);

    revalidatePath('/');
    redirect(`/${parsedData.category.replaceAll(' ','-')}/${slug}`);
}       