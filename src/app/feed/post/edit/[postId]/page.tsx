import PageHeader from "@/components/PageHeader/PageHeader";
import UserDetails from "../../_components/UserDetails";
import PostComposer from "../../_components/PostComposer";
import { redirect } from "next/navigation";
import { GetSession } from "@/lib/GetSession";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
// ===========================================================================================
export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });
  if (!post) return { title: "No Post Found" };
  return { title: post.content && post.content, description: "" };
}
async function EditPost({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;
  if (!postId) return redirect("/feed");
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  const postEdit = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      loves: true,
      comments: {
        include: {
          user: true,
        },
      },
      savePosts: {
        include: {
          user: true,
        },
      },
    },
  });
  if (!postEdit) redirect("/feed");
  return (
    <main className="min-h-screen flex-1  sm:p-5 p-3 space-y-10">
      <PageHeader title="Edit Post" />
      <div className="bg-white sm:p-6 p-3 shadow rounded-md sm:w-125 w-full space-y-5">
        <UserDetails userSession={userSession} />
        <PostComposer postEdit={postEdit} userSession={userSession} />
      </div>
    </main>
  );
}

export default EditPost;
