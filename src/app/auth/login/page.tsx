import Link from "next/link";
import LogInForm from "./LogInForm";

const LogInPage = () => {
    return (
        <>
            <div className="border-1 rounded-xl w-[700px] mx-auto p-4">
                <h2 className="text-3xl">Log in!</h2>
                <LogInForm />
                <div>Don´t have a acoount? Sign up <Link href="/auth/signup">here</Link></div>
            </div>
        </>
    )
}

export default LogInPage;