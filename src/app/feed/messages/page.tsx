import Image from "next/image";
import Link from "next/link";
import { randomUUID } from "node:crypto";
import { MdChatBubbleOutline } from "react-icons/md";
import { MdOutlineRemoveRedEye } from "react-icons/md";
// ========================================================================
function page() {
  const users = [
    {
      id: randomUUID(),
      name: "Amr Khaled",
      image:
        "https://i.pinimg.com/736x/2b/cc/55/2bcc55b3291035c4e53afbaa5dd1ae83.jpg",
      bio: "Co-founder & DEVOPS at masdar for digital transformations and IT",
      username: "@amrkhaled",
    },
    {
      id: randomUUID(),
      name: "Mohamed Osam",
      image:
        "https://i.pinimg.com/736x/9b/da/02/9bda024e50b719387cd088d57f176ae6.jpg",
      bio: "Free Browser extension to help you protect your gaze by automatically detecting and removing Haram images and videos.",
      username: "@mohamedosma",
    },
  ];
  return (
    <main className="flex-1 min-h-screen bg-indigo-50 p-5 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-gray-400 font-semibold">
          Talk to your friends and family
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="shadow bg-white p-5 rounded-md flex items-center justify-between gap-5"
          >
            <div className="flex gap-3">
              <Image
                src={user.image ? user.image : "/user.jpg"}
                alt="user image"
                width={50}
                height={50}
                className="object-cover rounded-full size-15 shrink-0"
              />
              <div>
                <h3 className="font-bold text-[18px] text-slate-700">
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
                href={`/feed/u/profile/${user.id}`}
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
