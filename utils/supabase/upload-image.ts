import { v4 as uuid } from 'uuid'
import { createClient } from './server-client';


export const uploadImage = async (image: File): Promise<string> => {
    const supabase = await createClient();
    const imageName = image.name.split('.');
    const path = `${image.name[0]}-${uuid()}.${imageName[1]}`;
    console.log('image size:',image.size);
    if(image.size > 2000000) throw new Error('image file too big.')
    const { data, error } = await supabase.storage.from('images').upload(path, image);
    if (error) throw error;

    const { data: { publicUrl }} = supabase.storage.from('images').getPublicUrl(data.path);

    return publicUrl;
}