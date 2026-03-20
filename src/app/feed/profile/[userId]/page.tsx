import Image from "next/image";
import Cover from "./_components/Cover";
import UserStats from "./_components/UserStats";
import EditProfile from "./_components/EditProfile";
import UserDetails from "./_components/UserDetails";
import { redirect } from "next/navigation";
import ProfilePosts from "./_components/ProfilePosts";
import { prisma } from "@/lib/prisma";
// =============================================================
async function Profile({ params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params;
  if (!userId) return redirect("/login");
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      posts: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  if (!user) return redirect("/login");
  return (
    <main className="flex-1 flex justify-center py-5">
      <div className="w-3xl h-fit space-y-5">
        <div className="shadow overflow-hidden rounded-lg h-fit">
          <Cover />
          <div className="flex gap-3 bg-white">
            <Image
              src={user.image || "/user.jpg"}
              alt="profile image"
              width={150}
              height={150}
              className="rounded-full shrink-0 size-30 ml-5 ring-3 ring-white -mt-13 shadow-2xl object-cover bg-white"
            />
            <div className="w-full pr-5 pt-2 pb-4 relative space-y-2">
              <UserDetails user={user}/>
              <UserStats />
              <EditProfile />
            </div>
          </div>
        </div>
        <ProfilePosts posts={user.posts} />
      </div>
    </main>
  );
}

export default Profile;
