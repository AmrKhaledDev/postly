"use client";
import { PostDbCacheType } from "@/lib/types";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import ButtonDeleteComment from "./ButtonDeleteComment";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditComment from "./EditComment";
// ==================================
dayjs.extend(relativeTime);
type Comment = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}>;
function CommentCard({
  comment,
  post,
  userSessionId,
}: {
  comment: Comment;
  post: PostDbCacheType;
  userSessionId: string;
}) {
  const [editComment, setEditComment] = useState(false);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, boxEditComment, .input"))
          setEditComment(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <li className="flex gap-2">
      <Image
        src={comment.user.image ? comment.user.image : "/user.jpg"}
        alt="user image"
        width={60}
        height={60}
        className="rounded-full ssm:size-10 size-7 shrink-0 object-cover"
      />
      <div>
        <div className="flex items-center gap-2">
          <Link
            href={`/feed/profile/${comment.userId}`}
            className="font-semibold sm:text-[18px] text-sm capitalize hover:underline"
          >
            {comment.user.name}
          </Link>
          {comment.userId === post.userId && (
            <span className="sm:text-xs text-[10px] px-1.5 text-white bg-gray-400 sm:rounded-md rounded font-bold">
              Author
            </span>
          )}
          <h3 className="font-normal sm:text-xs text-[10px] text-gray-500">
            {dayjs(comment.createdAt).fromNow()}
          </h3>
        </div>
        <div className="flex justify-between gap-3">
          <p className="sm:text-[15px] text-sm">{comment.content}</p>
          {userSessionId === comment.userId && (
            <div className="flex items-center gap-1 h-fit">
              <ButtonDeleteComment
                commentId={comment.id}
                userSessionId={userSessionId}
              />
              <button
                onClick={() => setEditComment(!editComment)}
                className="text-[17px] button cursor-pointer text-gray-500 hover:text-black transition-css"
              >
                <FiEdit />
              </button>
            </div>
          )}
        </div>
        {editComment && userSessionId === comment.userId && (
          <EditComment
            setEditComment={setEditComment}
            userSessionId={userSessionId}
            comment={comment}
          />
        )}
      </div>
    </li>
  );
}

export default CommentCard;
