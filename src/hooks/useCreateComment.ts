import { CreateCommentAction } from "@/actions/create-comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateComments = (id:number) => {
    const queryClient = useQueryClient();
    const { mutate, error, data } = useMutation({
        mutationFn: CreateCommentAction,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['mainPost']})
        }
    })

    return { mutate, error, data }
}   