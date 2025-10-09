import { z } from 'zod';

export const logInSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Your password must be a minimum of 6 characters')
})

export const signUpSchema = z.object({
    email: z.email(),
    password: z.string().min(6, 'Your password must be a minimum of 6 characters'),
    username: z.string().min(6, 'Username needs to be a minimum of 6 characters')
})

export const postSchema = z.object({
    title: z.string().min(3, 'Title must have more than 3 characters'),
    content: z.string().optional(),
    images: z.instanceof(FormData).optional()
})

//refreshing on create/post page return an error (FileList not defined..) - had to go with this solution
export const postWithImageSchema = postSchema.omit({ images: true })
    .extend({
        images: z.unknown()
            .transform(value => {
                return value as FileList
            }).refine(file => file[0]?.size >= 1000000 && file.length === 1 ? false : true, 'Image needs to be below 1MB').optional()
    })      