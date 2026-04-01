"use client";

import { EditCommentAction } from "@/lib/Actions/Edit/EditComment.action";
import { Prisma } from "@prisma/client";
import { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";
// ====================================
type Comment = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}>;
function EditComment({
  comment,
  userSessionId,
  setEditComment,
}: {
  comment: Comment;
  userSessionId: string;
  setEditComment: Dispatch<SetStateAction<boolean>>;
}) {
  const [newCommentContent, setNewCommentContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);
  const handleEditComment = async () => {
    setLoading(true);
    const result = await EditCommentAction(
      comment.id,
      userSessionId,
      newCommentContent,
    );
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    setEditComment(false);
    toast.success(result.message, { className: "toast-font" });
  };
  return (
    <div className="border boxEditComment sm:ml-5 m-2 rounded-md mt-1 border-gray-300 flex items-center gap-0.5">
      <input
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEditComment();
        }}
        value={newCommentContent}
        onChange={(e) => setNewCommentContent(e.target.value)}
        className="sm:text-sm text-xs input py-2 pl-2 flex-1 min-w-0 outline-none "
        type="text"
      />
      <button
        onClick={handleEditComment}
        disabled={newCommentContent.trim().length < 1 || loading}
        className="sm:text-xs text-[10px] disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-default disabled:scale-100 mr-1.5 active:scale-90 transition-css hover:scale-102 shadow text-white bg-indigo-500 py-1 sm:px-2 px-1.5 rounded-full cursor-pointer button"
      >
        {loading ? " Saving . . ." : " Save"}
      </button>
    </div>
  );
}

export default EditComment;
