"use client";

import { DeleteCommentAction } from "@/lib/Actions/Delete/DeleteComment.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
// ================================================
function ButtonDeleteComment({
  commentId,
  userSessionId,
}: {
  commentId: string;
  userSessionId: string;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    setLoading(true);
    const result = await DeleteCommentAction(commentId, userSessionId);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message);
    router.refresh();
  };
  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="text-xl disabled:text-gray-300 disabled:cursor-default cursor-pointer text-gray-500 hover:text-black transition-css"
    >
      <MdOutlineDelete />
    </button>
  );
}

export default ButtonDeleteComment;
