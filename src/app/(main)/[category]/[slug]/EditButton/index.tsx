'use client'

import Link from "next/link";


const EditButton = ({slug, category}:{slug:string, category:string}) => {
    return (
        <Link href={`/${category}/${slug}/edit`} className="button-secondary">Edit Post</Link>
    )
}

export default EditButton;        