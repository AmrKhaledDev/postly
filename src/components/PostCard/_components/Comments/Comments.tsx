import { PostDbCacheType } from "@/lib/types";
import CommentCard from "./_components/CommentCard";
// ===================================================
function Comments({
  post,
  userSessionId,
}: {
  post: PostDbCacheType;
  userSessionId: string;
}) {
  const comments = post.comments.sort((a, b) => {
    if (a.userId === post.userId) return -1;
    if (b.userId === post.userId) return 1;
    return 0;
  });
  return (
    <ul className="space-y-4 mt-8">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          post={post}
          comment={comment}
          userSessionId={userSessionId}
        />
      ))}
    </ul>
  );
}

export default Comments;
