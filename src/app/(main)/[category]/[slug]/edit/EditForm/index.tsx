'use client'

import { useForm } from "react-hook-form";
import { Tables } from "../../../../../../../utils/supabase/database-types";
import { useMutation } from "@tanstack/react-query";
import { EditPost } from "@/actions/edit-post";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { postWithImageSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import Image from "next/image";
import { useState } from "react";
import BackButton from "@/components/BackButton";

const errorMessages = ['Post title already taken..', 'Malformed image file', 'Not Authorized']
const EditForm = ({ defaultValues, postId }: { postId: number, defaultValues: Pick<Tables<'posts'>, 'title' | 'content' | 'images' | 'category'> }) => {
    const [imageName, setImageName] = useState<string[]>([]);
    const [currentImages, setCurrentImages] = useState<string[] | null>(defaultValues.images)
    const { register, handleSubmit, formState: { errors: zodErrors } } = useForm({
        resolver: zodResolver(postWithImageSchema),
        defaultValues: {
            title: defaultValues.title,
            content: defaultValues.content || undefined,
            images: null,
            category: defaultValues.category
        }
    });

    const { data, mutate } = useMutation({
        mutationFn: EditPost,
        onMutate: () => toast.loading('Editing post...', { id: 1, style: { color: '#fff' } }),
        onSettled: () => toast.success('Successfully updated!', { id: 1, style: { color: 'lightgreen' } })
    })

    if (data?.error && errorMessages.some(err => err === data?.error)) { toast.error('Post title already taken..', { id: 1, style: { color: 'red' } }); data.error = "" }

    const handleDeleteImages = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        defaultValues.images = null;
        setCurrentImages(null);
    }

    return (
        <>
            <form onSubmit={handleSubmit(values => {
                let imageForm: null | FormData = null;

                if (values.images && values.images.length > 0) {
                    imageForm = new FormData();
                    values.images.forEach(item => imageForm!.append('image', item))
                }

                mutate({
                    postId, updatedData: {
                        content: values.content!,
                        title: values.title,
                        images: imageForm,
                        category: values.category
                    },
                    currentImages: defaultValues.images ?? null
                })
            }

            )} className="p-4 flex flex-col w-full md:w-[700px] mx-auto shadow-2xl shadow-black my-[50] rounded-2xl">
                <div className="flex">
                    {currentImages && <button className="px-2 border" onClick={(e) => handleDeleteImages(e)}>Delete images</button>}
                    <BackButton />
                </div>
                <div className="flex gap-5 flex-wrap py-5">
                    {currentImages && currentImages.map(item => <Image key={item} src={item} height={100} width={100} alt="image" />)}
                </div>
                <fieldset className="flex flex-col gap-0 sm:flex-row sm:gap-3">
                    <label className="font-bold" htmlFor="title">Post title:</label>
                    <div className="flex gap-3">
                        <input className="border border-gray-500 indent-1" {...register('title')} id="title" placeholder="What's your post title?" />
                        {zodErrors.title && <ErrorMessage message={zodErrors.title.message!} />}
                    </div>
                </fieldset>
                <fieldset>
                    <label className="font-bold" htmlFor="content">What do you have to say?</label>
                    <textarea className="w-full h-100 border border-gray-500 p-2" {...register('content')} id="content" placeholder="Crickets in here..." />
                </fieldset>
                <fieldset className="mt-2 flex items-center gap-2">
                    <label className="font-bold cursor-pointer border p-1 text-nowrap" htmlFor="file">Select new images</label>
                    <div className="flex flex-col">
                        {imageName && imageName.map((file, index) => <div key={index + file} className="underline">{file}</div>)}
                        {zodErrors.images && <ErrorMessage message={zodErrors.images.message!} />}
                    </div>
                    <input type="file" multiple className="w-0 h-0" id="file" {...register('images')} onChange={(e) => { setImageName(e.target.files ? Array.from(e.target.files).map(f => f.name + " (Size:" + (f.size / 1000000).toFixed(2) + ' MB)') : []) }} />
                </fieldset>
                <button className="button-secondary w-1/2 m-auto mt-5">Update post!</button>
            </form>
        </>
    )

}

export default EditForm;        