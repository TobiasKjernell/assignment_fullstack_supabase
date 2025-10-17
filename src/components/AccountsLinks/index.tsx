import Link from "next/link"
import { createClient } from "../../../utils/supabase/server-client";
import LogOutButton from "./LogOutButton";
import CreatePostButton from "./CreatePostButton";
import React from "react";
import { DoorClosedIcon, KeyIcon } from "lucide-react";

const AccountsLinks = async ({ children }: { children?: React.ReactNode }) => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <div>
            {user ? <div className="flex items-center justify-center gap-5 pb-5 md:pb-0" > <CreatePostButton /> {children} <LogOutButton /></div>
                :
                <>
                    <div className="hidden md:flex items-center justify-center gap-5 pb-5 md:pb-0" >  
                        {children}
                        <Link href='/auth/login' className="button-secondary">Log in</Link>

                    </div>
                    <div className="md:hidden flex justify-between items-center w-full gap-5 pb-5 md:pb-0" >

                        {children}
                        <Link className="" href='/auth/login'><KeyIcon size={40} /></Link>

                    </div>
                </>

            }
        </div>
    )
}

export default AccountsLinks;