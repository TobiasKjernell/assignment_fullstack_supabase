'use client'
import { NewspaperIcon } from "lucide-react"
import { redirect } from "next/navigation"

const CreatePostButton = () => {
    const handleOnClick = () => {
        redirect('/createpost')
    }
    return (
        <>
            <div className="hidden md:block">
                <button className=" button-secondary" onClick={handleOnClick}>Create Post</button>
            </div>
            <div className="block md:hidden" onClick={handleOnClick}><NewspaperIcon size={40} /> </div>
        </>
    )
}   

export default CreatePostButton;