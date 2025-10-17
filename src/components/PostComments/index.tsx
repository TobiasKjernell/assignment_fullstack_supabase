'use client'
import Comments from "../CommentsModal";
import { useQuery } from "@tanstack/react-query";
import { getComments, GetUser, SinglePostsType } from "../../../utils/supabase/queries";
import { CommentRow } from "../../../utils/supabase/helpers";


const   PostComments = ({ post, user }: { post: SinglePostsType, user: GetUser }) => {

    const { data, error } = useQuery({
        queryKey: ['mainPost'],
        queryFn: async () => {
            const { data, error } = await getComments(post.id, CommentRow.rootPost)
            if (error) throw error.message;
            const orderFix = data?.sort((a, b) => a.id > b.id ? 1 : -1)
            return orderFix;
        },

    })

    const isPostOwner = user.user?.id === post.user_id ? true : false;
    if (error) throw error;
        
    return (
        <>
            {
                data &&
                <Comments>
                    <Comments.Toggle childButtonType={false} amountOfComments={data.length} />
                    <Comments.CommentForm id={post.id} rootPost={post.id} />
                    <Comments.List headComments={data} user={user} isPostOwner={isPostOwner} />
                </Comments>
            }
        </>
    )
}
export default PostComments;