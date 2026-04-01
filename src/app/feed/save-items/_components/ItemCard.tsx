"use client";

import { UserWithRelations } from "@/lib/types";
import Image from "next/image";
import ReactPlayer from "react-player";
import Link from "next/link";
import { IoBookmarks } from "react-icons/io5";
import { Prisma } from "@prisma/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { SavePostAction } from "@/lib/Actions/Create/SavePost.action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
//===============================================================
dayjs.extend(relativeTime);

type Item = Prisma.SavePostGetPayload<{
  include: {
    user: true;
    post: true;
  };
}>;
function ItemCard({
  userSession,
  item,
}: {
  userSession: UserWithRelations;
  item: Item;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDeletePostFromSaveItem = async () => {
    setLoading(true);
    const result = await SavePostAction(item.post.id, userSession.id);
    setLoading(false);
    if (!result.success)
      return toast.error(result.message, { className: "toast-font" });
    toast.success(result.message, { className: "toast-font" });
    router.refresh();
  };
  return (
    <li className="p-3 bg-white rounded-md space-y-2 h-fit relative cursor-pointer hover:bg-gray-50 shadow transition-css">
      <div onClick={() => router.push(`/feed/post/${item.post.id}`)}>
        <div className="flex gap-2">
          <Image
            src={item.user.image ? item.user.image : "/user.jpg"}
            alt="user image"
            width={50}
            height={50}
            className="size-8 rounded-full object-cover shrink-0"
          />
          <div>
            <Link
              href={`/feed/profile/${item.user.id}`}
              className="font-semibold text-sm hover:underline"
            >
              {item.user.name}
            </Link>
            <h3 className="font-normal text-[11px] text-gray-500">
              {dayjs(item.post.createdAt).fromNow()}
            </h3>
          </div>
        </div>
        <div className="space-y-1">
          <p dir="auto" className="text-sm line-clamp-1">
            {item.post.content}
          </p>
          {item.post.media ? (
            item.post.mediaType === "image" ? (
              <Image
                src={item.post.media}
                alt="media"
                width={500}
                height={500}
                className="object-cover rounded-md h-60"
              />
            ) : (
              <div className="w-full h-60 rounded-md overflow-hidden bg-black">
                <ReactPlayer
                  src={item.post.media}
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        disabled={loading}
        onClick={handleDeletePostFromSaveItem}
        className="absolute transition-css active:scale-90 hover:scale-110 top-1 right-1 text-green-500 text-[17px] cursor-pointer"
      >
        <IoBookmarks />
      </button>
    </li>
  );
}

export default ItemCard;
