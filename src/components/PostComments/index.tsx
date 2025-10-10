'use client'

import { useComments } from "@/hooks/useComments";
import Comments from "../CommentsModal";
import { useQuery } from "@tanstack/react-query";
import { SinglePostsType } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/browser-client";

// const fakeComment: IComment = {
//     id: "2",
//     post: "Heja Nu åker vi",
//     comments: [{ id: 'neja', post: 'jaja', comments: [ {
//                 id: '2', post: 'nere i helvete nere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvete etenere i helvetenere i helveten', comments: [{
//                     id: 'superchild', post: 'ojdå', comments: [{
//                         id: '2', post: 'satan finns här', comments: [{
//                             id: '2', post: 'nere i helvete', comments: [{ id: 'superchild', post: 'ojdå', comments: [{ id: '2', post: 'satan finns här', comments: [] }, { id: '2', post: 'satan finns här2', comments: [] }] }]
//                         }]
//                     }, { id: '2', post: 'satan finns här2', comments: [] }]
//                 }]
//             }] },
//     {
//         id: 'superchild', post: 'ojdå', comments: [
//             {
//                 id: '2', post: 'nere i helvete nere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvetenere i helvete etenere i helvetenere i helveten', comments: [{
//                     id: 'superchild', post: 'ojdå', comments: [{
//                         id: '2', post: 'satan finns här', comments: [{
//                             id: '2', post: 'nere i helvete', comments: [{ id: 'superchild', post: 'ojdå', comments: [{ id: '2', post: 'satan finns här', comments: [] }, { id: '2', post: 'satan finns här2', comments: [] }] }]
//                         }]
//                     }, { id: '2', post: 'satan finns här2', comments: [] }]
//                 }]
//             }
//         ]
//     }]
// }

const PostComments = ({ post }: { post: SinglePostsType }) => {
    const { data, error } = useQuery({
        queryKey: ['mainPost'],
        queryFn: async () => {
            const supabase = createClient();
            const { data, error } = await supabase.from('posts').select('*, users(username)').eq('id', post.id).single();
            if (error) throw error.message;
            return data;
        },


    })

    if (error) throw error;

    return (
        <>
            {
                data &&
                <Comments>
                    <Comments.Toggle childButtonType={false} post={data.comments} />
                    <Comments.CommentForm id={data.id} rootEntity={data.id} />
                    <Comments.List post={data} />
                </Comments>
            }
        </>
    )
}
export default PostComments;