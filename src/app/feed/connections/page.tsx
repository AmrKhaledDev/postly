import PageHeader from "@/components/PageHeader/PageHeader";
import Stats from "./_components/Stats";
import ConnectionsTabs from "./_components/ConnectionsTabs";
import { GetSession } from "@/lib/GetSession";
import { redirect } from "next/navigation";
import { Metadata } from "next";
// ===========================================================================
export const metadata:Metadata={
  title:"Postly | Connections",
  description:"Manage your network and discover new connections"
}
async function Connections() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  return (
    <main className="min-h-screen sm:p-5 p-3 space-y-10 flex-1">
      <PageHeader
        title="Connections"
        subtitle="Manage your network and discover new connections"
      />
      <div className="space-y-5">
        <Stats userSession={userSession} />
        <ConnectionsTabs userSession={userSession}  />
      </div>
    </main>
  );
}

export default Connections;
