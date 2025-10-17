import { getSinglePost } from "../../../../../utils/supabase/queries";
import { createClient } from "../../../../../utils/supabase/server-client";
import PostComments from "@/components/PostComments";
import DeleteButton from "./DeleteButton";
import Image from "next/image";
import EditButton from "./EditButton";
import BackButton from "@/components/BackButton";

const SinglePost = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { data: post } = await getSinglePost(slug)
    const supabase = await createClient();
    const { data:userAuth } = await supabase.auth.getUser();
    
    const isAuthor = userAuth.user?.id === post?.user_id ? true : false;

    return (
        <>
            {post &&
                <div className="flex flex-col w-full md:w-2xl p-4 m-auto border-gray-700 mt-4 rounded-2xl shadow-2xl shadow-black" >
                    <BackButton />
                    <h2 className="font-bold text-xl">{post.title}</h2>
                    <div className=" flex flex-col items-center justify-center">
                        {post.images && post.images.map(item => <Image key={item} className="mh-[500px] w-auto py-5" src={item} height={500} width={500} alt="post image" />)}
                        <p className="break-words w-full">{post.content}</p>
                    </div>
                    <p className="text-sm py-5">Created by: {post.users.username}</p>

                    <div className="mt-5">         
                        <PostComments post={post} user={userAuth} />    
                    </div>
                    {isAuthor && <div className="flex mt-5 md:mt-0 justify-center md:justify-end gap-2 ">
                        <EditButton slug={post.slug} category={post.category} />
                        <DeleteButton postId={post.id} />
                    </div>}
                </div>

            }
        </>
    )
}

export default SinglePost;