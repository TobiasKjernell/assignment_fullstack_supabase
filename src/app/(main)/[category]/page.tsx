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
    <div className="w-full md:w-[80%] m-auto shadow-2xl shadow-black bg-[#1d1d1d]">
      <h1 className="border text-center text-3xl p-2 capitalize" >{category}</h1> 
      {data && data.map(({ id, title, slug, users, images, created_at, category }) =>
        <Link href={`/${category.replace(" ", '-')}/${slug}`} className="flex flex-col md:flex-row border-1 rounded-md mt-4 p-4 background-dark hover:bg-[#1d1d1d] justify-between items-center" key={id }>
          <div className="flex gap-5">    
            <>
              {images ? <div className="flex flex-col md:flex-row items-center gap-2">
                <Image  src={images[0]} height={128} width={128} alt='post image' />
                {images.length > 1 && <span>(+{images?.length - 1})</span>}
              </div> : <ImageIcon size={128}  color="#DFB97C" />}       
            </>
            <div>
              <h2 className="font-bold text-xl">{title}</h2>  
              <div className="text-sm">Submitted {formatDistanceFromNow(created_at)} by {users.username}</div>
              <div></div>
            </div>
          </div>
          <span className="capitalize text-xl lg:text-3xl mt-4 md:mt-0 border-t-1 md:border-t-0  ">{category}</span>
        </Link>)}
      <Pagination count={dbLength!} />
    </div>
  );
}
