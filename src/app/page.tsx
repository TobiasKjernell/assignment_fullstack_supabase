import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "../../utils/supabase/queries";

export default async function Home() {
  const { data, error } = await getHomePosts();

  if (error) return;
  return (
    <div className="w-[80%] m-auto">
      <HomePosts posts={data!} />
    </div>
  );
}
