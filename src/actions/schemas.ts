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

export const commentSchema = z.object({
    content: z.string().max(250).min(5, 'minimi..').optional(),
    rootPost: z.number().optional(),
    rootComment: z.number().optional()
})

//refreshing on create/post page return an error (FileList not defined..) - had to go with this solution
export const postWithImageSchema = postSchema.omit({ images: true })
    .extend({
        images: z.unknown()
            .transform(value => {
                return value as FileList
            }).transform((value) => Array.from(value)).refine(files => {
                return files.every(file => [
                    "image/png",
                    "image/jpeg",
                    "image/jpg",
                ].includes(file.type))      
            }, { message: 'Wrong file type, needs to be: png, jpg, jpeg' })
            .refine(files => { return files.every(item => item.size >= 1000000 ? false : true) },
                { message: 'An image needs to be lesser than 1MB' }).optional()
    })          