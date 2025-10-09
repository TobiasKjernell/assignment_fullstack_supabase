'use client'

import { useForm } from "react-hook-form";
import { Tables } from "../../../../../../utils/supabase/database-types";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "@/actions/edit-post";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { postWithImageSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";


const EditForm = ({ defaultValues, postId }: { postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content'> }) => {
    const { register, handleSubmit, formState: {errors:zodErrors}} = useForm({
        resolver: zodResolver(postWithImageSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content!
        }
    });

    const { data, mutate } = useMutation({
        mutationFn: EditPost,

    })

    if (data?.error) toast.error(data.error);

    return (
        <form onSubmit={handleSubmit(values => mutate({
            postId, updatedData: {
                content: values.content!,
                title: values.title
            }
        }))} className="p-4 flex flex-col w-[700px] mx-auto shadow-2xl shadow-black my-[50] rounded-2xl">

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
                <label className="font-bold cursor-pointer border p-1 " htmlFor="file">Upload image?</label>
                <div className="flex flex-col">
                    {/* {imageName && <div className="underline">{imageName}</div>} */}
                    {/* {errors.images && <ErrorMessage message={errors.images.message!} />} */}
                </div>
                {/* <input type="file" className="w-0 h-0" id="file" {...register('images')} onChange={(e) => setImageName(e.target.value)} /> */}
            </fieldset>
            <button className="button-secondary w-1/2 m-auto">Update post!</button>
        </form>
    )
}

export default EditForm;        