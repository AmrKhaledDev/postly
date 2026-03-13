import { randomUUID } from "node:crypto";
import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
import { redirect } from "next/navigation";
import { GetUserWithRelations } from "@/lib/GetUserWithRelations";
import { getPosts } from "@/lib/DBCache/getPosts";
// ==========================================================================
async function Feeds() {
  const userSession = await GetUserWithRelations();
  if (!userSession) return redirect("/login");
  const now = new Date();
  const posts = await getPosts()
  return (
    <main className="flex-1 py-10 space-y-10">
      <Stories stories={userSession.stories} userId={userSession.id} />
      <Posts posts={posts} />
    </main>
  );
}

export default Feeds;
