import PageHeader from "@/components/PageHeader/PageHeader";
import { GetSession } from "@/lib/GetSession";
import { redirect } from "next/navigation";
import UserDetails from "../_components/UserDetails";
import PostComposer from "../_components/PostComposer";
import { Metadata } from "next";
// ===================================================================================================
export const metadata: Metadata = {
  title: "Postly | Create Post",
  description: "Share your thoughts and opinions with everyone",
};
async function CreatePost() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  return (
    <main className="min-h-screen flex-1  sm:p-5 p-3 space-y-10">
      <PageHeader
        title="Create Post"
        subtitle="Share your thoughts and opinions with everyone"
      />
      <div className="bg-white sm:p-6 p-3 shadow rounded-md sm:w-125 w-full space-y-5">
        <UserDetails userSession={userSession} />
        <PostComposer userSession={userSession} />
      </div>
    </main>
  );
}

export default CreatePost;
