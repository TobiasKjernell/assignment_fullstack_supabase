import { useQuery } from "@tanstack/react-query";
import { getSinglePost } from "../../utils/supabase/queries";

export const useSinglePost = (params: Promise<{ slug: string }>) => {
    const { data, error, isFetching } = useQuery({
        queryKey: ['singlePost'],
        queryFn: async () => {
            const { slug } = await params;
            const { data, error } = await getSinglePost(slug);
            if (error) throw error.message;
            return data;
        },
        staleTime: 1000 * 5
    });

    return { data, error, isFetching }
}