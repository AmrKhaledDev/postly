import PageHeader from "@/components/PageHeader/PageHeader";
import { getUsers } from "@/lib/DBCache/getUsers";
import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { MdChatBubbleOutline } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// ========================================================================
async function page() {
  const users = await getUsers()
  return (
    <main className="flex-1 min-h-screen bg-indigo-50 p-5 space-y-10">
      <PageHeader title="Messages" subtitle="Talk to your friends and family" />
      <ul className="grid grid-cols-2 gap-2">
        {users.map((user:User) => (
          <li
            key={user.id}
            className="shadow bg-white p-5 rounded-md flex items-center justify-between gap-5"
          >
            <div className="flex gap-3 items-center">
              <Image
                src={user.image ? user.image : "/user.jpg"}
                alt="user image"
                width={50}
                height={50}
                className="object-cover rounded-full size-15 shrink-0"
              />
              <div>
                <h3 className="font-bold text-[18px] text-slate-700 capitalize">
                  {user.name}
                </h3>
                <h4 className="text-gray-400 font-normal text-xs">
                  {user.username}
                </h4>
                <p className="line-clamp-2 text-sm text-gray-500">{user.bio}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3 text-gray-500">
              <Link
                href={`/feed/messages/${user.id}`}
                className="text-[18px] cursor-pointer hover:text-black transition-css active:scale-95 hover:scale-104 bg-gray-100 p-2 rounded-md"
              >
                <MdChatBubbleOutline />
              </Link>
              <Link
                href={`/feed/profile/${user.id}`}
                className="text-[18px] cursor-pointer hover:text-black transition-css active:scale-95 hover:scale-104 bg-gray-100 p-2 rounded-md"
              >
                <MdOutlineRemoveRedEye />
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default page;
