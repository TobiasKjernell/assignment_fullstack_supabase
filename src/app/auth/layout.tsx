import Logo from "@/components/Logo";
import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <header className="flex justify-between items-center">
                <Logo />

                {/* <button className="button-tertiary">TEst</button> */}
            </header>
            {children}
        </>
    )
}

export default AuthLayout;