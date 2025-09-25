'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ICommentContext {
    showComments: boolean,
    setShowComments: Dispatch<SetStateAction<boolean>>
}

const CommentsContext = createContext<ICommentContext | null>(null)

const Comments = ({ children }: { children: ReactNode }) => {
    const [showComments, setShowComments] = useState<boolean>(false)
    return <CommentsContext.Provider value={{
        showComments,
        setShowComments
    }} >
        <div className="flex flex-col">
            {children}
        </div>
    </CommentsContext.Provider>

}
const List = ({ comments }: { comments: string[] }) => {

    const { showComments } = useContext(CommentsContext) as ICommentContext;

    if (!showComments) return;
    return (
        <div>
            {comments.length > 0 &&
                comments.map((item, index) => <Item key={index} post={item} />)}
        </div>
    )
}

const Item = ({ post }: { post: string }) => {

    return (
        <div className="flex flex-col">
            {post}
            <Comments>
                <Toggle childButtonType={true} />
                <ChildComment>
                    <List comments={['Child1 Comment', 'Child2 Comment']} />
                </ChildComment>
            </Comments >
        </div >
    )
}

const Toggle = ({ children, childButtonType }: { children?: ReactNode, childButtonType: boolean }) => {
    const { setShowComments, showComments } = useContext(CommentsContext) as ICommentContext;
    const handleClick = () => setShowComments(!showComments);
    return (
        <div className="flex gap-2">
            {children}
            <button className={`text-sm border-1 ${childButtonType ? 'p-0 px-1 text-xs' : 'p-1'} rounded-sm hover:cursor-pointer`}>Add comment</button>
            <button onClick={handleClick} className={`text-sm border-1  ${childButtonType ? 'p-0 px-1 text-xs' : 'p-1'} rounded-sm hover:cursor-pointer`}>{showComments ? 'Hide comment' : 'Show comments'}</button>
        </div>
    )
}

const ChildComment = ({ children }: { children: ReactNode }) => {
    return <div className="bg-amber-400 pl-5">{children}</div>
}

Comments.List = List;
Comments.Item = Item;
Comments.Toggle = Toggle;
Comments.ChildComment = ChildComment;
export default Comments; 