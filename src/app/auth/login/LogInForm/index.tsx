'use client'
import { LogIn } from "@/actions/log-in";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "@/actions/schemas";
import ErrorMessage from "@/components/ErrorMessage";
import { useMutation } from "@tanstack/react-query";


const LogInForm = () => {
    const { register,
        handleSubmit,
        formState: { errors } } = useForm({
            resolver: zodResolver(logInSchema),
        });

    const { mutate, data } = useMutation({
        mutationFn: LogIn
    })

    return (
        <>
            <form onSubmit={handleSubmit(values => mutate((values)))} className="p-4 flex flex-col w-full md:w-[700px] mx-auto">
                <fieldset className="flex flex-col sm:flex-row sm:gap-5">
                    <label htmlFor="email">Enter your email</label>
                    <input className="text-amber-100" autoComplete="off" id="email" {...register('email')} placeholder="Enter your email" />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>
                <fieldset className="flex flex-col sm:flex-row sm:gap-5 ">   
                    <label htmlFor="password">Password</label>
                    <input className="text-amber-100" autoComplete="off" type="password" id="password" {...register('password')} placeholder="Enter your password" />
                    {errors.password && <ErrorMessage message={errors.password.message!} />}
                </fieldset>
                <button className="button-secondary w-1/2 m-auto mt-5">Log in!</button>
            </form>
            {data?.error && <ErrorMessage message={data.error} />}
        </>
    )
}

export default LogInForm;