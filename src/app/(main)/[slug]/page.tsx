'use client'
import Comments from "@/components/CommentsModal";
import { useSinglePost } from "@/hooks/useSinglePost";

const SinglePost = ({ params }: { params: Promise<{ slug: string }> }) => {
    const { data: post } = useSinglePost(params);

    return (
        <>
            {post &&
                <div>
                    <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        <h2 className="font-bold text-xl">{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Created by: {post.users.username}</p>

                        <div className="flex justify-between items-center mt-5">
                            <Comments>
                                <Comments.Toggle childButtonType={false}>
                                </Comments.Toggle>
                                <Comments.List comments={['Top1 Comment', 'Top2 Comment', 'Top3 Comment']} />
                            </Comments>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default SinglePost;