import { getAllPosts, getCategoryPosts } from "../../../../utils/supabase/queries";
import { createClient } from "../../../../utils/supabase/browser-client";
import Link from "next/link";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { formatDistanceFromNow } from "../../../../utils/supabase/helpers";
import Pagination from "@/components/Pagination";

export const revalidate = 600;

export default async function CategoryPage({ params, searchParams }: { params: Promise<{ category: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const supabase = createClient();
  const { category } = await params;
  const page = (await searchParams).page;

  const { data, error, count: dbLength } = category === 'all'
    ? await getAllPosts(supabase, Number(page))
    : await getCategoryPosts(supabase, category.replaceAll('-'," "), Number(page));

  if (error) return;
  return (  
    <div className="w-[80%] m-auto shadow-2xl shadow-black bg-[#1d1d1d]">
      {data && data.map(({ id, title, slug, users, images, created_at, category }) =>
        <Link href={`/${category.replace(" ", '-')}/${slug}`} className=" border-1 rounded-md mt-4 p-4 background-dark hover:bg-[#1d1d1d] flex justify-between items-center" key={id }>
          <div className="flex gap-5">
            <>
              {images ? <div className="flex items-center gap-2">
                <Image className="h-auto w-auto" src={images[0]} height={100} width={100} alt='post image' />
                {images.length > 1 && <span >(+{images?.length - 1})</span>}
              </div> : <ImageIcon size={128} color="#DFB97C" />}  
            </>
            <div>
              <h2 className="font-bold text-xl">{title}</h2>
              <div className="text-sm">Submitted {formatDistanceFromNow(created_at)} by {users.username}</div>
              <div></div>
            </div>
          </div>
          <span className="capitalize text-3xl">{category}</span>
        </Link>)}
      <Pagination count={dbLength!} />
    </div>
  );
}
