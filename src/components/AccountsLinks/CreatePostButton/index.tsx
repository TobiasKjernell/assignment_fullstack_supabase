'use client'
import { redirect } from "next/navigation"

const CreatePostButton = () => {
    const handleOnClick = () => {
        redirect('/createpost')
    }
    return (
        
        <button className=" button-tertiary" onClick={handleOnClick}>Create Post</button>
        
    )
}

export default CreatePostButton;