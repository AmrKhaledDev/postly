import Nav from "./_components/Nav";
import Head from "./_components/Head";
import UserProfileCard from "./_components/UserProfileCard";
import { GetSession } from "@/lib/GetSession";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
// =======================================================================
async function Sidebar() {
  const userSession: User | null = await GetSession();
  if (!userSession) return redirect("/");
  return (
    <aside className="bg-white border-r border-r-gray-100 w-60 h-screen flex flex-col justify-between sticky top-0 shrink-0 ">
      <div className="space-y-3">
        <Head />
        <Nav user={userSession} />
      </div>
      <UserProfileCard userSession={userSession} />
    </aside>
  );
}

export default Sidebar;
