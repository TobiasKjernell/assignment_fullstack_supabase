'use client'

import { signUpSchema } from "@/actions/schemas";
import { SignUp } from "@/actions/sign-up";
import ErrorMessage from "@/components/ErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const SignUpForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(signUpSchema)
    })

    const { mutate, data } = useMutation({
        mutationFn: SignUp
    })
    
    return (
        <>
            <form onSubmit={handleSubmit(value => mutate(value))} className="p-4 flex flex-col w-full md:w-[700px] mx-auto">
                <fieldset className="flex flex-col sm:flex-row sm:gap-5">
                    <label htmlFor="email">Enter your email:</label>
                    <input className="text-amber-100" autoComplete="off" id="email" {...register('email')} placeholder="Enter your email" />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>
                  <fieldset className="flex flex-col sm:flex-row sm:gap-5">
                    <label htmlFor="username">Username:</label>
                    <input className="text-amber-100" autoComplete="off" type="username" id="username" {...register('username')} placeholder="Enter your username" />
                       {errors.username && <ErrorMessage message={errors.username.message!} />}
                </fieldset> 
                  <fieldset className="flex flex-col sm:flex-row sm:gap-5">
                    <label htmlFor="password">Password:</label>
                    <input className="text-amber-100" autoComplete="off" type="password" id="password" {...register('password')} placeholder="Enter your password" />
                       {errors.password && <ErrorMessage message={errors.password.message!} />}
                </fieldset>
                <button className="button-secondary w-1/2 m-auto mt-5">Sign Up</button>
            </form>
            {data?.error && <ErrorMessage message={String(data.error)} />}
        </>
    )
}

export default SignUpForm;