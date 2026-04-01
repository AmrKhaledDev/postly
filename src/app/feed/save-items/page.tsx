import PageHeader from "@/components/PageHeader/PageHeader";
import { GetSession } from "@/lib/GetSession";
import { redirect } from "next/navigation";
import ItemCard from "./_components/ItemCard";
import { Metadata } from "next";
// ==============================================================================
export const metadata: Metadata = {
  title: "Postly | Save Items",
  description:
    "Save the posts you like and they will appear here for quick access",
};
async function SavePosts() {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  return (
    <main className="p-5 space-y-7 flex-1">
      <PageHeader
        title="Save Items"
        subtitle="Save the posts you like and they will appear here for quick access"
      />
      <ul className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
        {userSession.savePosts.map((item) => (
          <ItemCard userSession={userSession} item={item} key={item.id} />
        ))}
      </ul>
    </main>
  );
}

export default SavePosts;
