'use server'

import { redirect } from "next/navigation";
import { createClient as createServerClient } from "../../utils/supabase/server-client"

export const SignUp = async (formData: FormData) => {
    const userData = {
        email: formData.get('email') as string,
        username: formData.get('username') as string,
        password: formData.get('password') as string
    }

    const supabaseServer = await createServerClient();

    const { data: { user }, error:userError } = await supabaseServer.auth.signUp(userData)
    console.log(userError);
    if (user && user.email) {
        const { data, error } = await supabaseServer
            .from('users')
            .insert(
                [{ id: user.id, email: user.email, username: userData.username }])

        console.log("New User: ", user)
    }
    
    if(userError) throw userError;

    redirect('/')
}       