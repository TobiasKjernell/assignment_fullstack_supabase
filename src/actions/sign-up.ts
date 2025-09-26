'use server'

import { redirect } from "next/navigation";
import { z } from "zod"
import { createClient as createServerClient } from "../../utils/supabase/server-client"
import { signUpSchema } from "./schemas";
import { getAllUsersWithUsername } from "../../utils/supabase/queries";


export const SignUp = async (userDataValues: z.infer<typeof signUpSchema>) => {

    const parsedData = signUpSchema.parse(userDataValues);
    const supabaseServer = await createServerClient();
    const { data: userNameData, error } = await getAllUsersWithUsername(userDataValues.username);
   
    if (userNameData && userNameData?.length > 0) throw new Error('Username taken already');

    const { data: { user }, error: userError } = await supabaseServer.auth.signUp(parsedData)
    if (userError) throw userError;

    if (user && user.email) {
        const { data, error } = await supabaseServer
            .from('users')
            .insert(
                [{ id: user.id, email: user.email, username: userDataValues.username }])


        redirect('/')
    }



}       