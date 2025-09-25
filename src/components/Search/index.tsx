'use client'

import { Search } from "lucide-react";
import { SetStateAction, useState } from "react";
import Link from "next/link";
import { useSearchPosts } from "@/hooks/useSearchPosts";
import { useQueryClient } from "@tanstack/react-query";

const SearchInput = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const ql = useQueryClient();
    const handleInput = (e: { target: { value: SetStateAction<string> } }) => {
        ql.cancelQueries({ queryKey: ['search-results'] })
        setInputValue(e.target.value);
    }
    const { data } = useSearchPosts(inputValue);

    return (
        <>
            <div className="relative">
                <div className="flex items-center gap-2">
                    <Search />
                    <input name="search" className="bg-gray-200 p-2 border-1" placeholder="Search for post title" onChange={(e) => handleInput(e)} value={inputValue} />
                </div >
                {data && <div onClick={() => setInputValue('')} className="absolute bg-white p-2 divide-y border-1">{data.map(({ title, slug }) => <Link className="block" key={slug} href={`/${slug}`}>{title}</Link>)}</div>
                }
            </div >
        </>
    )
}

export default SearchInput;