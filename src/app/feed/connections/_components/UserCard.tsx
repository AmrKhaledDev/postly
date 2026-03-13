import Image from "next/image";
import Link from "next/link";
import { FaRegMessage } from "react-icons/fa6";
// ===================================================
function UserCard({ user, tapText }: { user: any; tapText: string }) {
  return (
    <div className="p-4 bg-white shadow rounded-md space-y-3">
      <div className="flex gap-2 items-center">
        <Image
          src={user.image ? user.image : "/user.jpg"}
          alt="user image"
          width={100}
          height={100}
          className="size-13 rounded-full shrink-0 object-cover"
        />
        <div className="space-y-4 w-ful">
          <div className="space-y-1">
            <h2 className="font-semibold text-[16px] capitalize">{user.name}</h2>
            <p className="text-gray-400 font-normal text-xs">{user.username}</p>
            <p className="line-clamp-1 text-sm text-gray-600">{user.bio}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/feed/profile/${user.id}`}
          className="text-white hover:scale-103 h-8 flex items-center justify-center transition-css text-center bg-linear-to-r from-indigo-500 to-purple-500 py-2 px-4 rounded font-medium text-sm tracking-[0.4px] flex-1"
        >
          View Profile
        </Link>
        {tapText === "following" && (
          <button className="text-slate-800 h-8 flex items-center justify-center hover:scale-103 transition-css cursor-pointer bg-gray-200 py-2 px-4 rounded font-medium text-sm tracking-[0.4px] flex-1">
            Unfollow
          </button>
        )}
        {tapText === "pending" && (
          <button className="text-slate-800 h-8 flex items-center justify-center hover:scale-103 transition-css cursor-pointer bg-gray-200 py-2 px-4 rounded font-medium text-sm tracking-[0.4px] flex-1">
            Accept
          </button>
        )}
        {tapText === "connections" && (
          <Link href={`/feed/messages/${user.id}`} className="text-slate-800 h-8 flex items-center justify-center  hover:scale-103 transition-css cursor-pointer bg-gray-200 py-2 px-4 rounded font-medium text-sm tracking-[0.4px] flex-1">
            <FaRegMessage />
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserCard;
