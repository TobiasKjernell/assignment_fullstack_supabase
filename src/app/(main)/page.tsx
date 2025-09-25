import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/browser-client";

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) return;
  return (
    <div className="w-[80%] m-auto">
      <HomePosts posts={data!} />
    </div>
  );
}
