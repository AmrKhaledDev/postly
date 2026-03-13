import { User } from "@prisma/client";
import Image from "next/image";
// ==========================================================
function UserDetails({ userSession }: { userSession: User }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={userSession.image ? userSession.image : "/user.jpg"}
        width={50}
        height={50}
        className="size-10 rounded-full object-cover"
        alt="your image"
      />
      <div>
        <h2 className="font-semibold text-xl capitalize">{userSession.name}</h2>
        <h3 className="text-xs font-normal text-gray-500">@amr_khaled</h3>
      </div>
    </div>
  );
}

export default UserDetails;
