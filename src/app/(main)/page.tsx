import { getHomePosts } from "../../../utils/supabase/queries";
import { createClient } from "../../../utils/supabase/browser-client";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { formatDistanceFromNow } from "../../../utils/supabase/helpers";


export const revalidate = 600;

export default async function Home() {
  const supabase = createClient();
  const { data, error } = await getHomePosts(supabase);

  if (error) return;
  return (  
    <div className="w-[80%] m-auto shadow-2xl shadow-black bg-[#1d1d1d]">
      {data && data.map(({ id, title, slug, users, images, created_at }) => 
        <Link href={`/${slug}`} className="block border-1 rounded-md mt-4 p-4 background-dark hover:bg-[#1d1d1d]" key={id}>
          <div className="flex gap-5">
            {images ? <Image className="h-auto w-auto" src={images} height={100} width={100} alt='post image' /> : <ImageIcon size={128} color="#DFB97C" />}
            <div>
              <h2 className="font-bold text-xl">{title}</h2>  
              <div className="text-sm">Submitted {formatDistanceFromNow(created_at)} by {users.username}</div>
              <div></div>
            </div>
          </div>
        </Link>)}
    </div>
  );
}
