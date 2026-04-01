import Cover from "./_components/Cover";
import UserStats from "./_components/UserStats";
import UserDetails from "./_components/UserDetails";
import { redirect } from "next/navigation";
import ProfilePosts from "./_components/ProfilePosts";
import { prisma } from "@/lib/prisma";
import { GetSession } from "@/lib/GetSession";
import SmallUserImage from "./_components/SmallUserImage";
// =============================================================
async function Profile({ params }: { params: Promise<{ userId: string }> }) {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  const { userId } = await params;
  if (!userId) return redirect("/login");
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      receiverRequests: {
        include: {
          sentRequests: true,
        },
      },
      posts: {
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
        orderBy: {
          createdAt: "desc",
        },
      },
      followers: {
        include: {
          follower: true,
        },
      },
      followings: {
        include: {
          following: true,
        },
      },
      savePosts: {
        include: {
          post: {
            include: {
              user: true,
            },
          },
          user: true,
        },
      },
      sentMessages: {
        include: {
          receiver: true,
        },
      },
    },
  });
  if (!user) return redirect("/login");
  return (
    <main className="flex-1 flex justify-center py-5 xl:px-0 px-2">
      <div className="xl:w-3xl w-full h-fit space-y-5">
        <div className="shadow overflow-hidden rounded-lg h-fit">
          <Cover user={user} />
          <div className="flex gap-3 bg-white">
            <SmallUserImage user={user} />
            <div className="w-full sm:pr-5 pr-3 pt-2 sm:pb-4 pb-3 relative space-y-2">
              <UserDetails user={user} userSession={userSession} />
              <UserStats user={user} />
            </div>
          </div>
        </div>
        <ProfilePosts posts={user.posts} />
      </div>
    </main>
  );
}

export default Profile;
