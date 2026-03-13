"use client";
import { GoHome } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { RiSearchLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import {  usePathname } from "next/navigation";
import { BiPlusCircle } from "react-icons/bi";
import Link from "next/link";
import { User } from "@prisma/client";
// =====================================================================================
function Nav({user}:{user:User}) {
  const pathname = usePathname();
  const links = [
    { id: "feed", linkText: "feed", href: "/feed", icon: <GoHome /> },
    {
      id: "messages",
      linkText: "messages",
      href: "/feed/messages",
      icon: <FiMessageCircle />,
    },
    {
      id: "connections",
      linkText: "connections",
      href: "/feed/connections",
      icon: <TbUsers />,
    },
    {
      id: "discover",
      linkText: "discover",
      href: "/feed/discover",
      icon: <RiSearchLine />,
    },
    {
      id: "profile",
      linkText: "profile",
      href: `/feed/profile/${user.id}`,
      icon: <FiUser />,
    },
  ];
  return (
    <nav className="px-6 py-2">
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={link.href}
              className={`flex items-center gap-2 hover:text-indigo-700 capitalize font-medium hover:shadow text-[17px] tracking-[0.3px] transition-css hover:bg-gray-50 py-1.5 px-3 rounded-xl 
                 ${pathname === link.href && "text-indigo-700 bg-gray-50 shadow"}`}
            >
              <i className="text-xl">{link.icon}</i>
              {link.linkText}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={"/feed/post/create"}
        className="flex items-center hover:scale-101 transition-css hover:-translate-y-0.5 justify-center gap-2 w-full shadow font-semibold mt-5 bg-linear-to-r from-indigo-700 to-purple-800 text-white py-2 px-3 rounded-md"
      >
        <i className="text-xl">
          <BiPlusCircle />
        </i>
        Create Post
      </Link>
    </nav>
  );
}

export default Nav;
