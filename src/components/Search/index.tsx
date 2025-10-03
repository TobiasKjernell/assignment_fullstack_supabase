'use client'

import { Search } from "lucide-react";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import { useQueryClient } from "@tanstack/react-query";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface IinputSearchValues {
    show: boolean,
    values: SetStateAction<string>
}

const SearchInput = () => {
    const [inputValue, setInputValue] = useState<IinputSearchValues>({show: false, values:''});
    const ql = useQueryClient();
    const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
        ql.cancelQueries({ queryKey: ['search-results'] })
        setInputValue({values:e.target.value, show:true });
    }
    const { data } = useSearchPosts(inputValue.values as string);
    const outsideClickHandler = () => setInputValue({...inputValue, show:false})
    const ref = useOutsideClick(outsideClickHandler);

    return (
        <div className="flex items-center gap-2" ref={ref} >
            <Search />
            <div className="relative">
                <input name="search" autoComplete='off' className="background-dark p-2 border-1" placeholder="Search for post title" onChange={(e) => handleInput(e)} value={inputValue.values as string} />
                {data && data.length > 0 && inputValue.show && <div onClick={() => setInputValue({values:'', show:false})} className="absolute background-dark divide-y-1 border-1 w-full text-center">{data.map(({ title, slug }) => <Link className="block py-2 background-dark background-gold hover:text-[#222] " key={slug} href={`/${slug}`}>{title}</Link>)}</div>}
            </div>
        </div >
    )
}

export default SearchInput;