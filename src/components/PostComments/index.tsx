'use client'
import Comments from "../CommentsModal";
import { useQuery } from "@tanstack/react-query";
import { getComments, SinglePostsType } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/browser-client";
import { Pinyon_Script } from "next/font/google";
import { CommentRow } from "../../../utils/supabase/helpers";

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
            const { data, error } = await getComments(post.id, CommentRow.rootPost)
            if (error) throw error.message;
            console.log(data);
            return data;
        },

    })

    if (error) throw error;

    return (
        <>
            {
                data &&
                <Comments>
                    <Comments.Toggle childButtonType={false} amountOfComments={data.length} />
                    <Comments.CommentForm id={post.id} rootPost={post.id} />
                    <Comments.List headComments={data} />
                </Comments>
            }
        </>
    )
}
export default PostComments;