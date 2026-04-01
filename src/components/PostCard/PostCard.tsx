"use client";
import { PostDbCacheType } from "@/lib/types";
import { User } from "@prisma/client";
import PublisherDetails from "./_components/PublisherDetails";
import PostContent from "./_components/PostContent";
import CreateComment from "./_components/CreateComment";
import { useEffect, useRef, useState } from "react";
import Comments from "./_components/Comments/Comments";
import PostFooterActions from "./_components/PostFooterActions/PostFooterActions";
//=============================================================================
function PostCard({
  post,
  userSession,
}: {
  post: PostDbCacheType;
  userSession: User;
}) {
  const [showComments, setShowComments] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [showComments]);
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (!e.target.closest(".button, .boxComments")) setShowComments(false);
      }
    };
    document.addEventListener("click", handle);
    return () => {
      document.removeEventListener("click", handle);
    };
  }, []);
  return (
    <li className="bg-white h-fit shadow rounded-xl p-5 space-y-3 list-none relative">
      <p className="absolute uppercase text-shadow-2xs font-semibold flex items-center gap-1 right-4 top-2 text-slate-500 sm:text-xs text-[10px]">
        <span className="text-white sm:text-sm text-xs sm:size-5 size-4 flex items-center justify-center rounded-full shadow bg-indigo-500">
          {post.comments.length}
        </span>
        comment
      </p>
      <PublisherDetails post={post} />
      <PostContent post={post} />
      <PostFooterActions
        userSession={userSession}
        post={post}
        setShowComments={setShowComments}
        showComments={showComments}
      />
      {showComments && (
        <div className="boxComments">
          <CreateComment
            userSession={userSession}
            inputRef={inputRef}
            postId={post.id}
          />
          {post.comments.length > 0 && showComments && (
            <Comments post={post} userSessionId={userSession.id} />
          )}
        </div>
      )}
    </li>
  );
}

export default PostCard;
