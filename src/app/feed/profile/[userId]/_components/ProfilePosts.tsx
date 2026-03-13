import PostCard from "@/components/PostCard/PostCard";
import { PostDbCacheType } from "@/lib/types";
import { randomUUID } from "crypto";
// ======================================================
function ProfilePosts({posts}:{posts:PostDbCacheType[]}) {
  return (
    <ul className="space-y-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default ProfilePosts;
