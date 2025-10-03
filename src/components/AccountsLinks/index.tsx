import Link from "next/link"
import { createClient } from "../../../utils/supabase/server-client";
import LogOutButton from "./LogOutButton";
import CreatePostButton from "./CreatePostButton";

const AccountsLinks = async () => {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (    
        <div>
            {user ? <div className="flex gap-5" > <CreatePostButton /> <LogOutButton /></div>
                :
                <Link href='/auth/login' className="button-secondary">Log in</Link>
            }
        </div>
    )
}

export default AccountsLinks;