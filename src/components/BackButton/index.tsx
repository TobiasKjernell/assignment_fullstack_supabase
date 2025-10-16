'use client'

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    return (
        <button className="border w-30 ml-auto hover:cursor-pointer hover:bg-[#DFB97C] hover:text-[#222]" onClick={() => router.back()}>Back</button>
    )
}
export default BackButton;