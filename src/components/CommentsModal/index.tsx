'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";
import { SingleCommentType } from "../../../utils/supabase/queries";

import { useComments } from "@/hooks/useComments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/actions/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentAction } from "@/actions/create-comment";


interface ICommentContext {
    showComments: boolean,
    setShowComments: Dispatch<SetStateAction<boolean>>
    showTextField: boolean,
    setShowTextField: Dispatch<SetStateAction<boolean>>
}

const CommentsContext = createContext<ICommentContext | null>(null)

const Comments = ({ children }: { children: ReactNode }) => {

    const [showComments, setShowComments] = useState<boolean>(false)
    const [showTextField, setShowTextField] = useState<boolean>(false)
    return <CommentsContext.Provider value={{
        showComments,
        setShowComments,
        showTextField,
        setShowTextField
    }} >
        <div className={`flex flex-col`}>
            {children}
        </div>
    </CommentsContext.Provider>

}

const List = ({ comments, postId }: { comments: number[], postId: number }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    const { currentComments, error, isFetching } = useComments(comments, postId);


    if (error) throw error;

    // console.log(currentComments);
    return (
        <div className={` ${showComments ? 'max-h-full' : 'max-h-0'} overflow-hidden `}>
            {currentComments && currentComments.length > 0 &&
                currentComments.map((item, index) => <MainComment key={index} post={item} />)}
        </div>
    )
}

const ChildList = ({ comments, postId }: { comments: number[], postId: number }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    const { currentComments, error, isFetching } = useComments(comments, postId);
    if (!comments) return;
    return (
        <div className={` ${showComments ? 'max-w-full max-h-full' : 'max-w-0 max-h-0'} overflow-hidden transition-all ease-in duration-200`}>
            {currentComments && currentComments.length > 0 &&
                currentComments.map((item, index) => <ChildComment key={index} post={item} />)}
        </div>
    )
}

const ChildComment = ({ post }: { post: SingleCommentType }) => {
    return (
        <div className="flex flex-col">
            <div className="p-2 border text-wrap overflow-hidden max-h-30">{post.content}</div>
            <Comments>
                <ChildParent>
                    <Toggle childButtonType={true} post={post.replies} />
                    <CommentForm id={post.id} />
                    {post.replies && <ChildList comments={post.replies} postId={post.id} />}
                </ChildParent>
            </Comments >
        </div >
    )
}

const MainComment = ({ post }: { post: SingleCommentType }) => {

    return (
        <div className="flex flex-col">
            <div className="p-2 border overflow-hidden max-h-30">{post.content}</div>
            <Comments>
                <MainParent>
                    <Toggle childButtonType={true} post={post.replies} />
                    <CommentForm id={post.id} />
                    {post.replies && <ChildList comments={post.replies} postId={post.id} />}
                </MainParent>
            </Comments >
        </div >
    )
}

const Toggle = ({ children, childButtonType, post }: { children?: ReactNode, childButtonType: boolean, post: number[] | null }) => {

    const { setShowComments, showComments, showTextField, setShowTextField } = useContext(CommentsContext) as ICommentContext;
    const handleShowTextField = () => setShowTextField(!showTextField);
    const handleShowComments = () => setShowComments(!showComments);

    return (
        <div className={`flex gap-2 my-2 ${childButtonType ? 'ml-auto' : ''}`}>
            {children}
            <button onClick={handleShowTextField} className={`text-nowrap text-sm border-1 ${childButtonType ? 'p-0 px-1 text-xs' : 'px-2'} rounded-sm hover:cursor-pointer`}>Add comment</button>
            <button disabled={!post || post.length === 0 ? true : false} onClick={handleShowComments} className={`text-nowrap text-sm border-1  ${childButtonType ? 'p-0 px-1 text-xs' : 'p-1 '} rounded-sm hover:cursor-pointer`}>{showComments ? `Hide comments (${post?.length})` : `Show comments (${post?.length ?? 0})`}</button>
        </div>
    )
}

const ChildParent = ({ children }: { children: ReactNode }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    return <div className={`pl-5 flex flex-col  ${showComments ? 'border-l border-dashed' : ''}`}>{children}</div>
}

const MainParent = ({ children }: { children: ReactNode }) => {
    return <div className="pl-5 flex flex-col">{children}</div>
}

const CommentForm = ({ id, rootEntity }: { id: number, rootEntity?: number | null }) => {

    const { showTextField, setShowTextField } = useContext(CommentsContext) as ICommentContext;
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(commentSchema)
    })

    const queryClient = useQueryClient();
    const { mutate, error, data } = useMutation({
        mutationFn: CreateCommentAction,
        onMutate: () => {

        },
        onSuccess: async () => {
            setShowTextField(false);        
            console.log(id);
            if (rootEntity) {           
                await queryClient.invalidateQueries({ queryKey: ['mainPost'] })
            }

            const delay = new Promise(res => setTimeout(res, 1000));
            await delay;
            // 

        }
    })

    return (
        <>
            {error && <div>{error.message}</div>}
            {showTextField &&
                <form onSubmit={handleSubmit(values => mutate({ content: values.content, rootEntity: rootEntity!, childEntity: id }))} className="w-full p-4 ">
                    <fieldset className="flex flex-col">
                        <label htmlFor="comment">Your comment:</label>
                        <textarea className="border h-50 p-2" id="content" {...register('content')} placeholder="Write your comment..." />
                    </fieldset>
                    <button className="rounded-sm hover:cursor-pointer text-nowrap text-sm border p-1 mt-1">Post comment</button>
                </form>
            }
        </>
    )
}

Comments.CommentForm = CommentForm;
Comments.List = List;
Comments.ChildList = ChildList;
Comments.ChildComment = ChildComment;
Comments.Item = MainComment;
Comments.Toggle = Toggle;
Comments.ChildComment = ChildParent;
Comments.MainParent = MainParent;
export default Comments; 