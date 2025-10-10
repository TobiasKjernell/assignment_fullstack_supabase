import { getSinglePost } from "../../../../utils/supabase/queries";
import { createClient } from "../../../../utils/supabase/server-client";
import PostComments from "@/components/PostComments";
import DeleteButton from "./DeleteButton";
import Image from "next/image";
import EditButton from "./EditButton";


const SinglePost = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { data: post } = await getSinglePost(slug)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const isAuthor = user?.id === post?.user_id ? true : false;

    return (
        <>
            {post &&

                <div className="w-2xl p-4 m-auto border-gray-700 mt-4 rounded-2xl shadow-2xl shadow-black" >
                    <h2 className="font-bold text-xl">{post.title}</h2>
                    <div className=" flex flex-col items-center justify-center">
                        {post.images && <Image className="mh-[500px] w-auto py-5" src={post.images} height={500} width={500} alt="post image" />}
                        <p>{post.content}</p>
                    </div>
                    <p className="text-sm py-5">Created by: {post.users.username}</p>

                    <div className=" mt-5">         
                        <PostComments post={post} />    
                    </div>
                    {isAuthor && <div className="flex justify-end gap-2">
                        <EditButton slug={post.slug} />
                        <DeleteButton postId={post.id} />
                    </div>}
                </div>

            }
        </>
    )
}

export default SinglePost;