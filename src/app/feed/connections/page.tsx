import PageHeader from "@/components/PageHeader/PageHeader";
import Stats from "./_components/Stats";
import ConnectionsTabs from "./_components/ConnectionsTabs";
import { GetSession } from "@/lib/GetSession";
import { getUsers } from "@/lib/DBCache/getUsers";
import { redirect } from "next/navigation";
// ===========================================================================
async function Connections() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  const users = await getUsers();
  return (
    <main className="min-h-screen p-5 space-y-10">
      <PageHeader
        title="Connections"
        subtitle="Manage your network and discover new connections"
      />
      <div className="space-y-5">
        <Stats />
        <ConnectionsTabs userSession={userSession} allUsers={users} />
      </div>
    </main>
  );
}

export default Connections;
