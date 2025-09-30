'use client'

import Comments from "../CommentsModal";

const PostComments = () => {
    return (
        <Comments>
            <Comments.Toggle childButtonType={false}>
            </Comments.Toggle>
            <Comments.List comments={['Top1 Comment', 'Top2 Comment', 'Top3 Comment']} />
        </Comments>
    )
}
export default PostComments;