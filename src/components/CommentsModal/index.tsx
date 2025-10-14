'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { CommentType, GetUser, SingleCommentType } from "../../../utils/supabase/queries";
import { useComments } from "@/hooks/useComments";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "@/actions/schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateCommentAction } from "@/actions/create-comment";
import { toast } from "sonner";
import { DeleteComment } from "@/actions/delete-comment";
import { formatDistanceFromNow } from "../../../utils/supabase/helpers";

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

const List = ({ headComments, user, isPostOwner }: { headComments: CommentType, user: GetUser, isPostOwner: boolean }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;

    return (
        <div className={` ${showComments ? 'max-h-full' : 'max-h-0'} overflow-hidden `}>
            {headComments && headComments.length > 0 &&
                headComments.map((item, index) => <MainComment key={index} comment={item} user={user} isPostOwner={isPostOwner} />)}
        </div>
    )
}

const ChildList = ({ parentCommentId, user, isPostOwner }: { parentCommentId: number, user: GetUser, isPostOwner: boolean }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    const { currentComments, error, isFetching } = useComments(parentCommentId);

    return (
        <div className={` ${showComments ? 'max-w-full max-h-full' : 'max-w-0 max-h-0'} overflow-hidden transition-all ease-in duration-200`}>
            {currentComments && currentComments.length > 0 &&
                currentComments.map((item, index) => <ChildComment key={index} comment={item} parentId={parentCommentId} user={user} isPostOwner={isPostOwner} />)}
        </div>
    )
}

const ChildComment = ({ comment, parentId, user, isPostOwner }: { comment: SingleCommentType, parentId: number, user: GetUser, isPostOwner: boolean }) => {
    const { currentComments } = useComments(comment.id);

    let commentsToDelete: number[] = []
    if (currentComments && currentComments.length > 1) commentsToDelete = [...currentComments.map(el => el.id), comment.id]
    else commentsToDelete = [comment.id];

    return (
        <>
            {currentComments &&
                <div className="flex flex-col">
                    {(user.user && user.user.id === comment.user_id || isPostOwner) && <DeleteButton commentId={commentsToDelete} parentId={parentId} isMainPostComment={false} amount={currentComments.length} />}
                    <div className="p-2 border overflow-hidden max-h-30"><p className="text-amber-100 break-words">{comment.content}</p></div>
                    <Comments>
                        <ChildParent>
                            <Toggle childButtonType={true} amountOfComments={currentComments!.length}>
                                <div className="text-xs">Created by: {comment.users.username} ({formatDistanceFromNow(comment.created_at)})</div>
                            </Toggle>
                            <CommentForm id={comment.id} rootComment={comment.id} />
                            {currentComments && <ChildList parentCommentId={comment.id} user={user} isPostOwner={isPostOwner} />}
                        </ChildParent>
                    </Comments >
                </div >
            }
        </>
    )
}

const MainComment = ({ comment, user, isPostOwner }: { comment: SingleCommentType, user: GetUser, isPostOwner: boolean }) => {

    const { currentComments, error, isFetching } = useComments(comment.id);
    let commentsToDelete: number[] = []
    if (currentComments && currentComments.length > 1) commentsToDelete = [...currentComments.map(el => el.id), comment.id]
    else commentsToDelete = [comment.id];

    return (
        <>
            {currentComments &&
                <div className="flex flex-col">
                    {(user.user && user.user.id === comment.user_id || isPostOwner) && <DeleteButton commentId={commentsToDelete} parentId={0} isMainPostComment={true} amount={currentComments.length} />}
                    <div className="p-2 border overflow-hidden max-h-30"><p className="text-amber-100 break-words">{comment.content}</p></div>
                    <Comments>
                        <MainParent>
                            <Toggle childButtonType={true} amountOfComments={currentComments!.length}>
                                <div className="text-xs">Created by: {comment.users.username} ({formatDistanceFromNow(comment.created_at)})</div>
                            </Toggle>
                            <CommentForm id={comment.id} rootComment={comment.id} />
                            {currentComments && <ChildList parentCommentId={comment.id} user={user} isPostOwner={isPostOwner} />}
                        </MainParent>
                    </Comments >
                </div >
            }
        </>
    )
}

const Toggle = ({ children, childButtonType, amountOfComments }: { children?: ReactNode, childButtonType: boolean, amountOfComments: number | null }) => {
    const { setShowComments, showComments, showTextField, setShowTextField } = useContext(CommentsContext) as ICommentContext;
    const handleShowTextField = () => setShowTextField(!showTextField);
    const handleShowComments = () => { setShowComments(!showComments); }

    useEffect(() => {
        if (amountOfComments === 0 && showComments) setShowComments(false);
    }, [amountOfComments]) //bad but it's needed, need to find a workaround.

    return (
        <div className="flex justify-between">
            {children}
            <div className={`flex gap-2 my-2 ${childButtonType ? 'ml-auto' : ''}`}>
                <button onClick={handleShowTextField} className={`text-nowrap text-sm border-1 ${childButtonType ? 'p-0 px-1 text-xs' : 'px-2'} rounded-sm hover:cursor-pointer`}>{showTextField ? 'Cancel comment' : 'Add comment'}</button>
                <button disabled={!amountOfComments || amountOfComments === 0 ? true : false} onClick={handleShowComments} className={`text-nowrap text-sm border-1  ${childButtonType ? 'p-0 px-1 text-xs' : 'p-1 '} rounded-sm hover:cursor-pointer`}>{showComments ? `Hide comments (${amountOfComments})` : `Show comments (${amountOfComments ?? 0})`}</button>
            </div>
        </div>

    )
}

const ChildParent = ({ children }: { children: ReactNode }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    return <div className={`pl-5 flex flex-col  ${showComments ? 'border-l border-dashed' : ''}`}>{children}</div>
}

const MainParent = ({ children }: { children: ReactNode }) => {
    const { showComments } = useContext(CommentsContext) as ICommentContext;
    return <div className={`pl-5 flex flex-col  ${showComments ? 'border-l border-dashed' : ''}`}>{children}</div>
}

const DeleteButton = ({ commentId, parentId, isMainPostComment, amount }: { commentId: number[], parentId: number, isMainPostComment: boolean, amount: number }) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(
        {
            mutationFn: DeleteComment,
            onError: () => toast.error("Could not delete comment!"),
            onSuccess: async () => {
                toast.success('Deleted comment!')

                if (isMainPostComment)
                    await queryClient.invalidateQueries({ queryKey: ['mainPost'] })
                if (parentId)
                    await queryClient.invalidateQueries({ queryKey: ['comments', parentId] })
            },
        },
    );
    return (
        <button onClick={() => mutate(commentId)} className={`text-nowrap border-red-500 text-red-500 hover:bg-red-500 hover:text-[#222]  border-1 border-b-0 p-0 px-1 text-xs hover:cursor-pointer`}>Delete comment</button>
    )
}

const CommentForm = ({ id, rootComment, rootPost }: { id: number, rootComment?: number | null, rootPost?: number | null }) => {

    const { showTextField, setShowTextField, setShowComments } = useContext(CommentsContext) as ICommentContext;
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
            setShowComments(true);

            if (rootPost)
                await queryClient.invalidateQueries({ queryKey: ['mainPost'] })
            else
                await queryClient.invalidateQueries({ queryKey: ['comments', id] })

        }
    })

    return (
        <>
            {error && <div>{error.message}</div>}
            {showTextField &&
                <form onSubmit={handleSubmit(values => mutate({ content: values.content, rootComment: rootComment!, rootPost: rootPost! }))} className="w-full p-4 ">
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