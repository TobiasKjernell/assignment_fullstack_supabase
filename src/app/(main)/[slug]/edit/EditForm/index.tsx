'use client'

import { useForm } from "react-hook-form";
import { Tables } from "../../../../../../utils/supabase/database-types";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "@/actions/edit-post";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { postWithImageSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import Image from "next/image";
import { useState } from "react";


const EditForm = ({ defaultValues, postId }: { postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content' | 'images'> }) => {
    const [imageName, setImageName] = useState<string[]>([]);
    const { register, handleSubmit, formState: { errors: zodErrors } } = useForm({
        resolver: zodResolver(postWithImageSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
            images: defaultValues.images
        }
    });

    const { data, mutate } = useMutation({
        mutationFn: EditPost,

    })

    if (data?.error) toast.error(data.error);

    return (
        <form onSubmit={handleSubmit(values => {
            let imageForm: undefined | FormData = undefined;

            if (values.images && values.images.length > 0 && values.images.every(item => typeof item !== 'string')) {
                imageForm = new FormData();
                values.images.forEach(item => imageForm!.append('image', item))
                // imageForm.append('image', values.images[0]);
            }

            mutate({
                postId, updatedData: {
                    content: values.content!,
                    title: values.title,
                    images: imageForm
                }

            })
        }

        )} className="p-4 flex flex-col w-[700px] mx-auto shadow-2xl shadow-black my-[50] rounded-2xl">
            <div className="flex gap-5 p-5">    
            {defaultValues.images && defaultValues.images.map(item => <Image key={item} src={item} height={100} width={100} alt="image" />)}
            </div>
            <fieldset className="flex gap-3">
                <label className="font-bold" htmlFor="title">Post title:</label>
                <div className="flex gap-3">
                    <input className="border border-gray-500 indent-1" {...register('title')} id="title" placeholder="What's your post title?" />
                    {zodErrors.title && <ErrorMessage message={zodErrors.title.message!} />}
                    {/* {error && <ErrorMessage message={error.message} />} */}
                </div>
            </fieldset>
            <fieldset>
                <label className="font-bold" htmlFor="content">What do you have to say?</label>
                <textarea className="w-full h-100 border border-gray-500 p-2" {...register('content')} id="content" placeholder="Crickets in here..." />
            </fieldset>
            <fieldset className="mt-2 flex items-center gap-2">
                <label className="font-bold cursor-pointer border p-1 text-nowrap" htmlFor="file">Update image?</label>
                <div className="flex flex-col">
                   {imageName && imageName.map((file, index) => <div key={index + file} className="underline">{file}</div>)}
                    {zodErrors.images && <ErrorMessage message={zodErrors.images.message!} />}
                </div>
                <input type="file" multiple className="w-0 h-0" id="file" {...register('images')} onChange={(e) =>  { setImageName(e.target.files ? Array.from(e.target.files).map(f => f.name + " (Size:" + (f.size / 1000000).toFixed(2) + ' MB)') : []) }} />
            </fieldset>
            <button className="button-secondary w-1/2 m-auto">Update post!</button>
        </form>
    )
}

export default EditForm;        