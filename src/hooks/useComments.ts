import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../utils/supabase/queries";

export const useComments = (commentsArray: number[] | null, id: number) => {
    if (commentsArray === null) commentsArray = []

    const { data: currentComments, isFetching, error } = useQuery({
        queryKey: ['comments', id],
        queryFn: async () => {
            const { data, error } = await getComments(commentsArray)
            const ok = data?.sort((a, b) => a.id > b.id ? 1 : -1)
            console.log(commentsArray);     
            if (error) throw error.message;
            return ok;
        },

        // staleTime: 10000
    })

    return { currentComments, isFetching, error }
}
