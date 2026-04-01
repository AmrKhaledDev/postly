"use client";
import { User } from "@prisma/client";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ButtonFolllow from "@/app/feed/profile/[userId]/_components/ButtonFolllow";
import { UserWithRelations } from "@/lib/types";
import { RiSendPlaneFill } from "react-icons/ri";
import Link from "next/link";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import EditProfile from "./EditProfile/EditProfile";
// =======================================================================
dayjs.extend(relativeTime);
function UserDetails({
  user,
  userSession,
}: {
  user: UserWithRelations;
  userSession: User;
}) {
  const userInformations = [
    {
      id: "location",
      icon: <HiOutlineLocationMarker size={15} />,
      label: user.location,
    },
    {
      id: "joined",
      icon: <MdOutlineDateRange size={15} />,
      label: `Joined ${dayjs(user.createdAt).fromNow()}`,
    },
  ];
  const [isEditProfile, setIsEditProfile] = useState(false);
  return (
    <>
      <div className="w-full flex justify-between gap-3">
        <h2 className="lg:text-3xl sm:text-2xl text-xl font-bold capitalize">
          {user.name}
        </h2>
        <button
          onClick={() => setIsEditProfile(true)}
          className="flex shrink-0 h-fit items-center border border-gray-100 rounded-md py-2 px-4 font-semibold text-slate-500 hover:shadow transition-css cursor-pointer gap-1.5 lg:text-[15px] sm:text-sm text-xs"
        >
          <FaRegEdit className="sm:size-5 size-4" /> Edit
        </button>
      </div>
      {user.id !== userSession.id && (
        <div className="flex items-center gap-2 flex-wrap">
          <ButtonFolllow user={user} userSession={userSession} />
          <Link
            href={`/feed/messages/${user.id}`}
            className="text-white  flex items-center tracking-[0.3px] gap-2 hover:scale-102 transition-css active:scale-95 justify-center bg-linear-to-r from-indigo-500 to-purple-500 w-40 py-2 rounded-md cursor-pointer lg:text-[15px] text-sm"
          >
            <RiSendPlaneFill className="lg:size-5 size-4" /> Message
          </Link>
        </div>
      )}
      {user.username && (
        <h3 className="text-sm font-normal text-gray-400">@{user.username}</h3>
      )}
      <p className="font-semibold text-slate-600 sm:text-[15px] text-sm">
        {user.bio}
      </p>
      <div className="flex items-center gap-3 text-gray-400">
        {userInformations.map(
          (info) =>
            info.label && (
              <p
                key={info.id}
                className="flex items-center gap-1 capitalize text-xs font-semibold"
              >
                {info.icon} {info.label}
              </p>
            ),
        )}
      </div>
      <span className="w-full h-0.5 bg-gray-200 opacity-20 block mt-3" />
      {isEditProfile && (
        <EditProfile
          userSession={userSession}
          setIsEditProfile={setIsEditProfile}
        />
      )}
    </>
  );
}

export default UserDetails;
