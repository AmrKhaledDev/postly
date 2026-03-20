import { User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
// ===================================================
function UserReceiverDetails({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-2 bg-white mx-auto shadow py-1.5 px-4 rounded-md mt-2 pl-35">
      <Image
        src={user.image ? user.image : "/user.jpg"}
        alt="user image"
        width={50}
        height={50}
        className="size-11 rounded-full object-cover"
      />
      <div>
        <Link
          href={`/feed/profile/${user.id}`}
          className="font-semibold text-[18px] capitalize hover:underline"
        >
          {user.name}
        </Link>
        <h3 className="text-sm font-normal text-gray-500">@mohammed</h3>
      </div>
    </div>
  );
}

export default UserReceiverDetails;
