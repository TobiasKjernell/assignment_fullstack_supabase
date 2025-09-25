import Link from "next/link"
import { createClient } from "../../../utils/supabase/server-client";
import LogOutButton from "./LogOutButton";
import CreatePostButton from "./CreatePostButton";
import { cookies } from "next/headers";

const AccountsLinks = async () => {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    return (    
        <div>
            {user ? <div className="flex gap-5" > <h3>Logged in as  </h3> <CreatePostButton /> <LogOutButton /></div>
                :
                <Link href='/auth/login' className="button-secondary">Log in</Link>
            }
        </div>
    )
}

export default AccountsLinks;