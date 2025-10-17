'use client'

import { useRouter } from "next/navigation";

const BackButton = () => {
    const router = useRouter();
    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.back()   
    }
    return (
        <button className="border w-30 ml-auto hover:cursor-pointer hover:bg-[#DFB97C] hover:text-[#222]" onClick={(e) => handleBack(e)}>Back</button>
    )
}
export default BackButton;