import { SignUp } from "@/actions/sign-up";

const SignUpForm = () => {
    return (
        <>
            <form action={SignUp} className="p-4 flex flex-col w-[700px] mx-auto">
                <fieldset>
                    <label htmlFor="email">Enter your email</label>
                    <input id="email" name="email" placeholder="Enter your email" />
                </fieldset>
                     <fieldset>
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" name="username" placeholder="Enter your username" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Username</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </fieldset>
                <button className="button-secondary w-1/2 m-auto">Sign Up</button>
            </form>
        </>
    )
}

export default SignUpForm;