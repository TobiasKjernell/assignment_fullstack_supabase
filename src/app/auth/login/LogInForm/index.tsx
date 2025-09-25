import { LogIn } from "@/actions/log-in";

const LogInForm = () => {
    return (
        <>
            <form action={LogIn} className="p-4 flex flex-col w-[700px] mx-auto">
                <fieldset>
                    <label htmlFor="email">Enter your email</label>
                    <input id="email" name="email" placeholder="Enter your email" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Username</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" />
                </fieldset>
                <button className="button-secondary w-1/2 m-auto">Log in!</button>
            </form>
        </>
    )
}

export default LogInForm;