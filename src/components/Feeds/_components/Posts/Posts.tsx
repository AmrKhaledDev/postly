"use client";
import { useEffect, useState } from "react";
import PostCard from "../../../PostCard/PostCard";
import { PostDbCacheType, UserWithRelations } from "@/lib/types";
import { pusherClient } from "@/lib/pusherClient";
import { Post } from "@prisma/client";
// ===============================================================================
function Posts({
  posts: intialPosts,
  userSession,
}: {
  posts: PostDbCacheType[];
  userSession: UserWithRelations;
}) {
  const [posts, setPosts] = useState<PostDbCacheType[]>(intialPosts);
  useEffect(() => {
    const channel = pusherClient.subscribe("posts-feed");
    channel.bind("new-post", (newPost: PostDbCacheType) => {
      setPosts((prev) => {
        if (prev.find((p) => p.id === newPost.id)) return prev;
        return [newPost, ...prev];
      });
    });
    channel.bind("edit-post", (postEdited: PostDbCacheType) => {
      setPosts((prev) =>
        prev.map((p) => (p.id === postEdited.id ? postEdited : p)),
      );
    });
    channel.bind("delete-post", (postDeleted: Post) => {
      setPosts((prev) => prev.filter((p) => p.id !== postDeleted.id));
    });
    return () => {
      pusherClient.unsubscribe("posts-feed");
    };
  }, []);
  return (
    <ul className="w-full space-y-3">
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} userSession={userSession} />
      ))}
    </ul>
  );
}

export default Posts;
