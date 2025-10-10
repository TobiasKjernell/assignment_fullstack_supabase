'use server'

import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server-client"
import { logInSchema } from "./schemas";
import { z } from "zod";

export const LogIn = async (userDataValues: z.infer<typeof logInSchema>) => {

        const parsedData = logInSchema.parse(userDataValues);

        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.signInWithPassword(parsedData);

        if (error) return { error: error.message }  

        redirect('/');
}