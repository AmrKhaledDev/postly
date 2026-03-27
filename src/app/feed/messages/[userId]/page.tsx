import { redirect } from "next/navigation";
import UserReceiverDetails from "./_components/UserReceiverDetails";
import Messages from "./_components/Messages";
import { GetSession } from "@/lib/GetSession";
import { prisma } from "@/lib/prisma";
// ====================================================================================================================
async function Chat({ params }: { params: Promise<{ userId: string }> }) {
  const userSession = await GetSession();
  if (!userSession) return redirect("/login");
  const { userId } = await params;
  if (!userId) return redirect("/");
  const receiver = await prisma?.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!receiver) return redirect("/login");
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userSession.id, receiverId: receiver.id },
        { senderId: userId, receiverId: userSession.id },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  if (userId === userSession.id) return redirect("/feed");
  return (
    <main className="h-screen flex-1 space-y-3 pr-5 pl-4 lg:pl-0">
      <UserReceiverDetails user={receiver} />
      <Messages
        messages={messages}
        userSessionId={userSession.id}
        receiverId={receiver.id}
      />
    </main>
  );
}

export default Chat;
