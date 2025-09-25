import { useQuery } from "@tanstack/react-query";
import { getSearchedPosts } from "../../utils/supabase/queries";

export const useSearchPosts = (e: string) => {

    const { data, error } = useQuery({
        queryKey: ['search-results', e],
        queryFn: async ({ signal }) => {
            const { data, error } = await getSearchedPosts(e, signal);
            if (error) throw new Error();
            return data;
        },
        enabled: e.length > 3
    })

    return { data, error }
}