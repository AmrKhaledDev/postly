import { User } from "@prisma/client";
import Image from "next/image";
import ButtonSignOut from "./ButtonSignOut";
// =================================================================
function UserProfileCard({ userSession }: { userSession: User }) {
  return (
    <div className="px-3 py-3 flex items-center justify-between gap-2 border-t border-t-gray-100 w-full">
      <div className="flex items-center gap-2">
        <Image
          src={userSession.image ?? "/user.jpg"}
          alt="your image"
          width={100}
          height={100}
          className="size-11 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-[17px] text-slate-800 line-clamp-1 capitalize">
            {userSession.name}
          </h2>
          <h3 className="text-gray-500 text-sm font-normal line-clamp-1">
            {userSession.email}
          </h3>
        </div>
      </div>
      <ButtonSignOut />
    </div>
  );
}

export default UserProfileCard;
