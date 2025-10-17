import { slugify } from "../../../utils/slugify";
import { getAllCategories } from "../../../utils/supabase/queries";
import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  const { data, error } = await getAllCategories();

  if (error) return;

  const categories: string[] = Array.from(new Set(data.map(item => item.category)));

  return (  
    <div className="w-full md:w-[80%] m-auto shadow-2xl shadow-black bg-[#1d1d1d]">
      <h2 className="border text-center text-3xl p-2" >Pick your category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 md:grid-cols-3 grid-row-auto p-5 gap-2">
        <Link href={`/all`} className="border h-[50px] sm:h-[200px] text-center text-2xl font-bold flex flex-col justify-center hover:bg-[#DFB97C] hover:text-[#222]"><span>All</span></Link>
        {categories.length > 0 && categories.map((item, index) => <Link key={index} href={`/${slugify(item)}`} className="border h-[50px] sm:h-[200px] text-center text-2xl font-bold capitalize flex flex-col justify-center hover:bg-[#DFB97C] hover:text-[#222]"><span>{item}</span></Link>)}
      </div>
    </div>  
  );
}   
