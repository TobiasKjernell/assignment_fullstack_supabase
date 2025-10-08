'use server'

import { redirect } from "next/navigation";
import { z } from "zod"
import { createClient as createServerClient } from "../../utils/supabase/server-client"
import { signUpSchema } from "./schemas";
import { getAllUsersWithUsername } from "../../utils/supabase/queries";


export const SignUp = async (userDataValues: z.infer<typeof signUpSchema>) => {

    const { data: userNameData } = await getAllUsersWithUsername(userDataValues.username);
    if (userNameData && userNameData?.length > 0) return { error: 'Username already taken' };

    const parsedData = signUpSchema.parse(userDataValues);
    const supabaseServer = await createServerClient();
    const { data: { user }, error: userError } = await supabaseServer.auth.signUp(parsedData)

    if (userError) return { error: userError }

    if (user && user.email) {
        const { data } = await supabaseServer
            .from('users')
            .insert(
                [{ id: user.id, email: user.email, username: userDataValues.username }])

        redirect('/')
    }

}       