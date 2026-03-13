import PostCard from "../../../PostCard/PostCard";
import { PostDbCacheType } from "@/lib/types";
// ===============================================================================
function Posts({ posts }: { posts: PostDbCacheType[] }) {
  return (
    <ul className="w-full space-y-3">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default Posts;
