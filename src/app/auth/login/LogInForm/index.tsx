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

    const { mutate, error } = useMutation({
        mutationFn: LogIn
    })

    return (
        <>
            <form onSubmit={handleSubmit(values => mutate((values)))} className="p-4 flex flex-col w-[700px] mx-auto">
                <fieldset>
                    <label htmlFor="email">Enter your email</label>
                    <input id="email" {...register('email')} placeholder="Enter your email" />
                    {errors.email && <ErrorMessage message={errors.email.message!} />}
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" {...register('password')} placeholder="Enter your password" />
                    {errors.password && <ErrorMessage message={errors.password.message!} />}
                </fieldset>
                <button className="button-secondary w-1/2 m-auto">Log in!</button>
            </form> 
            {error && <ErrorMessage message={error.message}/>}
        </>
    )
}

export default LogInForm;