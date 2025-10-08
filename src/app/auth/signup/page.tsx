import Link from "next/link";
import SignUpForm from "./SignUpForm";

const SignUpPage = () => {
    return (
        <>
            <div className="border-1 rounded-xl w-[700px] mx-auto p-4">
                <h2 className="text-3xl">Sign up!</h2>
                <SignUpForm />
                <div>Already have a account? Log in! <Link href="/auth/login">here</Link></div>
            </div>
        </>
    )
}   

export default SignUpPage;