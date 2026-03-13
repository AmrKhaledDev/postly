import PageHeader from "@/components/PageHeader/PageHeader";
import { GetSession } from "@/lib/GetSession";
import { redirect } from "next/navigation";
import UserDetails from "./_components/UserDetails";
import PostComposer from "./_components/PostComposer";
// ===================================================================================================
async function CreatePost() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  return (
    <main className="min-h-screen flex-1 p-5 space-y-10">
      <PageHeader
        title="Create Post"
        subtitle="Share your thoughts and opinions with everyone"
      />
      <div className="bg-white p-6 shadow rounded-md w-125 space-y-5">
        <UserDetails userSession={userSession} />
        <PostComposer userSession={userSession} />
      </div>
    </main>
  );
}

export default CreatePost;
