/* eslint-disable prefer-const */
import { createServerClient } from "@supabase/ssr"
import { NextURL } from "next/dist/server/web/next-url";
import { NextRequest, NextResponse } from "next/server"

export const middleware = async (request: NextRequest) => {
    let supabaseRes = NextResponse.next({ request });
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                    cookiesToSet.forEach(({ name, value, options }) => supabaseRes.cookies.set(name, value, options));
                }
            }
        }
    )

    const { data: { user }, error } = await supabase.auth.getUser()
    const protectedRoutes = [/^\/createpost$/];

    if (!user && protectedRoutes.some(route => route.test(request.nextUrl.pathname))) {
        const newrUrl: NextURL = request.nextUrl.clone();
        newrUrl.pathname = '/auth/login';
        return NextResponse.redirect(newrUrl);
    }

    return supabaseRes;
}   