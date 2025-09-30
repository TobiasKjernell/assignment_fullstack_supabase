import { getSinglePost } from "../../../../utils/supabase/queries";
import { createClient } from "../../../../utils/supabase/server-client";
import PostComments from "@/components/PostComments";
import DeleteButton from "./DeleteButton";


const SinglePost = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { data: post } = await getSinglePost(slug)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const isAuthor = user?.id === post?.user_id ? true : false;

    return (
        <>
            {post &&
                <div>
                    <div className="w-2xl p-4 m-auto border-gray-700 border-1 mt-4 rounded-2xl">
                        <h2 className="font-bold text-xl">{post.title}</h2>
                        <p>{post.content}</p>
                        <p>Created by: {post.users.username}</p>

                        <div className="flex justify-between items-center mt-5">
                            <PostComments />
                        </div>
                        {isAuthor && <div className="flex justify-end">
                            <DeleteButton postId={post.id} />
                        </div>}
                    </div>
                </div>
            }
        </>
    )
}

export default SinglePost;