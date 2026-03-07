import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import Image from "next/image";
import Link from "next/link";
import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa6";
import { LuShare2 } from "react-icons/lu";
import PostMedia from "./PostMedia";
//=============================================================================
dayjs.extend(relativeTime);
function PostCard({ post }: { post: any }) {
  return (
    <li  className="bg-white shadow rounded-xl p-5 space-y-4">
      <div className="flex gap-2">
        <Image
          src={post.userImage ? post.userImage : "/user.jpg"}
          alt="user image"
          width={50}
          height={50}
          className="rounded-full object-cover size-11"
        />
        <div>
          <h2 className="text-[18px] font-semibold capitalize">
            {post.userName}
          </h2>
          <h4 className="text-xs text-gray-400 font-normal">
            {dayjs(post.date).fromNow()}
          </h4>
        </div>
      </div>
      <div className="space-y-2">
        <p>{post.title}</p>
        <PostMedia post={post} />
      </div>
      <div className="flex items-center gap-5 pt-3 border-t border-t-gray-200">
        <button className="flex items-center gap-1 cursor-pointer text-[17px] hover:scale-110 transition-css active:scale-95">
          <FaRegHeart />
          <span className="text-sm font-semibold">10</span>
        </button>
        <button className="flex items-center gap-1 cursor-pointer text-[17px] hover:scale-110 transition-css active:scale-95">
          <FaRegComment />
          <span className="text-sm font-semibold">2</span>
        </button>
        <button className="flex items-center gap-1 cursor-pointer text-[17px] hover:scale-110 transition-css active:scale-95">
          <LuShare2 />
          <span className="text-sm font-semibold">5</span>
        </button>
      </div>
    </li>
  );
}

export default PostCard;
