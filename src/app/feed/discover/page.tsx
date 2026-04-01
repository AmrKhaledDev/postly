import PageHeader from "@/components/PageHeader/PageHeader";
import DiscoverUsers from "./_components/DiscoverUsers";
import { GetSession } from "@/lib/GetSession";
import { redirect } from "next/navigation";
import { getUsers } from "@/lib/DBCache/getUsers";
import { Metadata } from "next";
// ===============================================================================
export const metadata:Metadata={
  title:"Postly | Discover",
  description:"Connect with amazing people and grow your network"
}
async function Discover() {
const userSession = await GetSession()
if(!userSession) return redirect("/login")
  const defaultUsers = await getUsers()
  return (
    <main className="min-h-screen bg-indigo-50 sm:p-5 p-3 space-y-10 flex-1">
      <PageHeader
        title="Discover People"
        subtitle="Connect with amazing people and grow your network"
      />
      <DiscoverUsers userSession={userSession} defaultUsers={defaultUsers}/>
    </main>
  );
}

export default Discover;
