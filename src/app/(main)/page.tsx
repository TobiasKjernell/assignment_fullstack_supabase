import { slugify } from "../../../utils/slugify";
import { getAllCategories } from "../../../utils/supabase/queries";
import Link from "next/link";

export const revalidate = 600;

export default async function Home() {
  const { data, error} = await getAllCategories();

  if (error) return;

  const categories:string[] = Array.from(new Set(data.map(item => item.category)));

  return (
    <div className="w-[80%] m-auto shadow-2xl shadow-black bg-[#1d1d1d]  mt-2">
      <h2 className="border text-center text-3xl p-2" >Pick your category</h2> 
      <div className="grid grid-cols-5 row-auto p-5 gap-2">   
        <Link href={`/all`} className="border px-15 py-10 text-center text-2xl font-bold">All</Link>
          {categories.length > 0 && categories.map((item, index) =>  <Link key={index} href={`/${slugify(item)}`} className="border px-15 py-10 text-center text-2xl font-bold capitalize">{item}</Link>)}
      </div>
    </div>        
  );
}
