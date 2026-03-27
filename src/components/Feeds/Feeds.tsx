import Posts from "./_components/Posts/Posts";
import Stories from "./_components/Stories/Stories";
import { redirect } from "next/navigation";
import { getPosts } from "@/lib/DBCache/getPosts";
import { GetSession } from "@/lib/GetSession";
// ==========================================================================
async function Feeds() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  const followingsStories = userSession.followings
    .map((f) => f.following.stories)
    .flat();
  const stories = [...userSession.stories, ...followingsStories];
  const posts = await getPosts();
  return (
    <main className="flex-1 py-10 lg:px-0 sm:px-3 px-1 space-y-10">
      <Stories stories={stories} userId={userSession.id} />
      <Posts posts={posts} userSession={userSession} />
    </main>
  );
}

export default Feeds;
