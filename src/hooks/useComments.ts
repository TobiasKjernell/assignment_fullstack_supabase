import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../utils/supabase/queries";

export const useComments = (commentsArray: number[], id?: number) => {

    const { data: currentComments, isFetching, error } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const { data, error } = await getComments(commentsArray)
            if (error) throw error.message;
            return data;
        },

        // staleTime: 10000
    })

    return { currentComments, isFetching, error }
}
