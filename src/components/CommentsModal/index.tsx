'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

interface ICommentContext {
    showComments: boolean,
    setShowComments: Dispatch<SetStateAction<boolean>>
}

export interface IComment {
    id: string,
    post: string,
    comments: IComment[]
}

const CommentsContext = createContext<ICommentContext | null>(null)

const Comments = ({ children }: { children: ReactNode }) => {

    const [showComments, setShowComments] = useState<boolean>(false)
    return <CommentsContext.Provider value={{
        showComments,
        setShowComments
    }} >
        <div className={`flex flex-col`}>
            {children}
        </div>
    </CommentsContext.Provider>

}

const List = ({ comments }: { comments: IComment }) => {

    const { showComments } = useContext(CommentsContext) as ICommentContext;

    return (
        <div className={` ${showComments ? 'max-h-screen' : 'max-h-0'} overflow-hidden transition-all ease-in-out duration-1000 mb-3`}>
            {comments.comments?.length > 0 &&
                comments.comments.map((item, index) => <MainComment key={index} post={item} />)}
        </div>
    )
}

const ChildList = ({ comments }: { comments: IComment }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    return (
        <div className={` ${showComments ? 'max-w-full max-h-screen' : 'max-w-0 max-h-0'} overflow-hidden transition-all ease-in duration-200 mb-3`}>
            {comments.comments?.length > 0 &&
                comments.comments.map((item, index) => <ChildComment key={index} post={item} />)}
        </div>
    )
}

const ChildComment = ({ post }: { post: IComment }) => {
    return (
        <div className="flex flex-col">
            <div className="p-2 my-2 border">{post.post}</div>
            <Comments>
                <ChildParent>
                    <Toggle childButtonType={true} post={post} />
                    <ChildList comments={post} />
                </ChildParent>
            </Comments >
        </div > 
    )
}

const MainComment = ({ post }: { post: IComment }) => {

    return (
        <div className="flex flex-col">
            <div className="p-2 my-2 border ">{post.post}</div>
            <Comments>
                <MainParent>
                    <Toggle childButtonType={true} post={post} />   
                    <ChildList comments={post} />
                </MainParent>
            </Comments >
        </div >
    )
}

const Toggle = ({ children, childButtonType, post }: { children?: ReactNode, childButtonType: boolean, post: IComment }) => {

    const { setShowComments, showComments } = useContext(CommentsContext) as ICommentContext;
    const handleClick = () => setShowComments(!showComments);
    return (
        <div className={`flex gap-2 ${childButtonType ? 'ml-auto' : ''}`}>
            {children}
            <button className={`text-sm border-1 ${childButtonType ? 'p-0 px-1 text-xs' : 'p-1'} rounded-sm hover:cursor-pointer`}>Add comment</button>
            <button disabled={post.comments?.length === 0 ? true : false} onClick={handleClick} className={`text-sm border-1  ${childButtonType ? 'p-0 px-1 text-xs' : 'p-1'} rounded-sm hover:cursor-pointer`}>{showComments  ? 'Hide comment' : `Show comments (${post.comments?.length})`}</button>
        </div>
    )
}

const ChildParent = ({ children }: { children: ReactNode }) => {
     const { showComments } = useContext(CommentsContext) as ICommentContext;
    return <div className={`pl-5 flex flex-col ${showComments ? 'border-l border-dashed' : '' }`}>{children}</div>
}   

const MainParent = ({ children }: { children: ReactNode }) => {
    return <div className="pl-5 flex flex-col">{children}</div>
}

Comments.List = List;
Comments.ChildList = ChildList;
Comments.ChildComment = ChildComment;
Comments.Item = MainComment;
Comments.Toggle = Toggle;
Comments.ChildComment = ChildParent;
Comments.MainParent = MainParent;
export default Comments; 