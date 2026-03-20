import { User } from "@prisma/client";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineDateRange } from "react-icons/md";
// =======================================================================
function UserDetails({user}:{user:User}) {
  const userInformations = [
    { id: "location", icon: <HiOutlineLocationMarker size={15} />, label: "egypt" },
    {
      id: "joined",
      icon: <MdOutlineDateRange size={15} />,
      label: "Joined 20 minutes ago",
    },
  ];
  return (
    <>
      <h2 className="text-3xl font-bold capitalize">{user.name}</h2>
      <h3 className="text-sm font-normal text-gray-400">{user.username}</h3>
      <p className="font-semibold text-slate-600">
       {user.bio}
      </p>
      <div className="flex items-center gap-3 text-gray-400">
        {userInformations.map((info) => (
          <p
            key={info.id}
            className="flex items-center gap-1 capitalize text-xs font-semibold"
          >
            {info.icon} {info.label}
          </p>
        ))}
      </div>
      <span className="w-full h-0.5 bg-gray-200 opacity-20 block mt-3" />
    </>
  );
}

export default UserDetails;
