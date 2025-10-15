import { getSinglePost } from "../../../../../../utils/supabase/queries";
import EditForm from "./EditForm";

const Edit = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { data, error } = await getSinglePost(slug);

    if(error) return <div>Something went wrong</div>
    return (
        <div>
            {data && <EditForm postId={data.id} defaultValues={{ title: data.title, content: data.content, images:data.images, category: data.category }} />}
        </div>
    )

}
export default Edit;    