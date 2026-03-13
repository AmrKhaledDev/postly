"use client";
import { HiUsers } from "react-icons/hi2";
import { useState } from "react";
import UserCard from "./UserCard";
import { User } from "@prisma/client";
// ===================================================================
function ConnectionsTabs({
  userSession,
  allUsers,
}: {
  userSession: User;
  allUsers: User[];
}) {
  const [currentTap, setCurrentTap] = useState("followers");
  const taps = [
    { value: "followers", label: "Followers" },
    { value: "following", label: "Following" },
    { value: "pending", label: "Pending" },
    { value: "connections", label: "Connections" },
  ];
  const followers = [
    {
      id: crypto.randomUUID(),
      name: "Yaser Mohammed",
      bio: "Co-founder & DEVOPS at masdar for digital transformations and IT",
      image:
        "https://i.pinimg.com/736x/bd/3b/16/bd3b16868f55313d5d70415d8b969a91.jpg",
      username: "@yaser_mohammed",
    },
  ];
  const following = [
    {
      id: crypto.randomUUID(),
      name: "Ahmed Khaled",
      bio: "University Lecturer & Full-Stack Developer | Angular & React | Building Scalable and Accessible Web Applications",
      image:
        "https://i.pinimg.com/736x/61/31/4d/61314d055f92ca874a0f1b50d517ee28.jpg",
      username: "@ahmed_khaled",
    },
    {
      id: crypto.randomUUID(),
      name: "Yahya Naser",
      bio: "IT Student | AI & Web Dev Enthusiast | Turning Ideas into Solutions",
      image:
        "https://i.pinimg.com/736x/b3/47/65/b34765110d932f8c3fd3499e12d9dd9e.jpg",
      username: "@yahya_naser",
    },
  ];
  const pending = [
    {
      id: crypto.randomUUID(),
      name: "Tarek Abdalah",
      bio: "AI & Machine Learning Trainee @ITI",
      image:
        "https://i.pinimg.com/736x/67/d4/73/67d473ac5acd3069d909813c79d55942.jpg",
      username: "@tarek_abdalah",
    },
    {
      id: crypto.randomUUID(),
      name: "Rohayem Ahmed",
      bio: "Sr. Odoo Functional Consultant | Certified V (16/17/18)",
      image:
        "https://i.pinimg.com/736x/ed/97/17/ed97179b1a21251a1b4f3c2f03cd9273.jpg",
      username: "@rohayem_ahmed",
    },
    {
      id: crypto.randomUUID(),
      name: "Rohayem Ahmed",
      bio: "Sr. Odoo Functional Consultant | Certified V (16/17/18)",
      image:
        "https://i.pinimg.com/736x/ed/97/17/ed97179b1a21251a1b4f3c2f03cd9273.jpg",
      username: "@rohayem_ahmed",
    },
  ];
  const connections = allUsers;
  const usersMap: any = {
    followers,
    following,
    pending,
    connections,
  };
  const users = usersMap[currentTap] || [];
  return (
    <>
      <div className="bg-white py-3 px-6 rounded-md shadow w-fit flex items-center gap-10">
        {taps.map((tap) => (
          <button
            onClick={() => setCurrentTap(tap.value)}
            key={tap.value}
            className={`flex items-center gap-2 hover:text-slate-900 transition-css font-bold text-sm
                 ${currentTap === tap.value ? "text-slate-900 cursor-default" : "cursor-pointer text-slate-500"} 
                `}
          >
            <HiUsers size={20} />
            {tap.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3">
        {users !== undefined &&
          users.map(
            (user: any) =>
              user.id !== userSession.id && (
                <UserCard key={user.id} user={user} tapText={currentTap} />
              ),
          )}
      </div>
    </>
  );
}

export default ConnectionsTabs;
