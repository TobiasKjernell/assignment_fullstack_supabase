
import { getSinglePost } from "../../../../../utils/supabase/queries";
import EditForm from "./EditForm";

const Edit = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const { data, error } = await getSinglePost(slug);


    return (
        <div>
            {data && <EditForm postId={data.id} defaultValues={{ title: data.title, content: data.content }} />}
        </div>
    )

}
export default Edit;    