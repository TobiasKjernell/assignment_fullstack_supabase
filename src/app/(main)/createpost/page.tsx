'use client'

import { CreatePostAction } from "@/actions/create-post";
import { postWithImageSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Category } from "../../../../utils/constants";

const errorMessages = ['Post title already taken..', 'Malformed image file', 'Not Authorized']
const CreatePost = () => {
    const [imageName, setImageName] = useState<string[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(postWithImageSchema)
    });

    const { mutate, data } = useMutation({
        mutationFn: CreatePostAction,
        onMutate: () => toast.loading('Creating post...', { id: 1, style: { color: '#fff' } }),
        onSettled: () => toast.success('Post successfully posted!', { id: 1, style: { color: 'lightgreen' } })
    })


    //redirect from action bug with error, tmp fix
    //https://nextjs.org/docs/app/guides/redirecting
    //redirect returns a 307 (Temporary Redirect) status code by default. When used in a Server Action, it returns a 303 (See Other), which is commonly used for redirecting to a success page as a result of a POST request.
    if (data?.error && errorMessages.some(err => err === data?.error)) {toast.error('Post title already taken..', { id: 1, style: { color: 'red' } }); data.error = ''}

    return (
        <form onSubmit={handleSubmit(values => {
            const imageForm:FormData = new FormData();

            if (values.images && values.images.length > 0 && values.images.every(item => typeof item !== undefined))
                values.images.forEach(item => imageForm.append('image', item))


            mutate({
                title: values.title,
                content: values.content,
                category: values.category,
                images: imageForm
            })

        })} className="p-4 flex flex-col w-[700px] mx-auto shadow-2xl shadow-black my-[50] rounded-2xl">

            <fieldset className="flex gap-3 justify-between">
                <div className="flex gap-3">
                    <label className="font-bold" htmlFor="title">Post title:</label>
                    <input className="border border-gray-500 indent-1" id="title" {...register('title')} placeholder="What's your post title?" />
                    {errors.title && <ErrorMessage message={errors.title.message!} />}
                    {/* {error && <ErrorMessage message={error.message} />} */}
                </div>
                <div className="flex items-center border">
                    <label className="text-xs px-1" htmlFor="drop">Category:</label>
                    <select id="drop" {...register('category')} defaultValue={Category.Animals} className="focus:outline-0 text-center bg-[#222] selectionFix">
                        <option value={Category.Animals}>Animals</option>
                        <option value={Category.Cars}>Cars</option>
                        <option value={Category.Coding}>Coding</option>
                        <option value={Category.Food}>Food</option>
                        <option value={Category.OffTopic}>Off Topic</option>
                        <option value={Category.Sports}>Sports</option>
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <label className="font-bold" htmlFor="content">What do you have to say?</label>
                <textarea className="w-full h-100 border border-gray-500 p-2" id="content" {...register('content')} placeholder="Crickets in here..." />
            </fieldset>
            <fieldset className="mt-2 flex items-center gap-2">
                <label className="font-bold cursor-pointer border p-1 text-nowrap " htmlFor="files">Upload image(s)?</label>
                <div className="flex flex-col">
                    {imageName && imageName.map((file, index) => <div key={index + file} className="underline">{file}</div>)}
                    {errors.images && <ErrorMessage message={errors.images.message!} />}
                </div>
                <input type="file" multiple={true} className="w-0 h-0" id="files" {...register('images')} onChange={(e) => { setImageName(e.target.files ? Array.from(e.target.files).map(f => f.name + " (Size:" + (f.size / 1000000).toFixed(2) + ' MB)') : []) }} />

            </fieldset>
            <button className="button-secondary w-1/2 m-auto">Create post!</button>
        </form>
    )
}
export default CreatePost;  