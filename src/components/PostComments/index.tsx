'use client'

import Comments, { IComment } from "../CommentsModal";

const fakeComment: IComment = {
    id: "2",
    post: "Heja Nu åker vi",
    comments: [{ id: 'neja', post: 'jaja', comments: [] },
    {
        id: 'superchild', post: 'ojdå', comments: [
            {
                id: '2', post: 'nere i helvete', comments: [{
                    id: 'superchild', post: 'ojdå', comments: [{
                        id: '2', post: 'satan finns här', comments: [{
                            id: '2', post: 'nere i helvete', comments: [{ id: 'superchild', post: 'ojdå', comments: [{ id: '2', post: 'satan finns här', comments: [] }, { id: '2', post: 'satan finns här2', comments: [] }] }]
                        }]
                    }, { id: '2', post: 'satan finns här2', comments: [] }]
                }]
            }
        ]
    }]
}

const PostComments = () => {
    return (
        <Comments>
            <Comments.Toggle childButtonType={false} post={fakeComment} />
            <Comments.List comments={fakeComment} />
        </Comments>
    )
}
export default PostComments;