"use server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusherServer";
// =================================================================
type Data = {
  type: string;
  content: string;
  senderId: string;
  receiverId: string;
  messageId?: string;
};

export const MessageAction = async (
  data: Data,
): Promise<{ success: boolean; message?: string }> => {
  const { content, receiverId, senderId, type, messageId } = data;
  if (!content?.trim())
    return { success: false, message: "You cannot send an empty message" };
  const room = [senderId, receiverId].sort().join("_");
  try {
    if (type === "create") {
      if (!senderId || !receiverId)
        return { success: false, message: "Missing sender or receiver info" };
      const users = await prisma.user.count({
        where: { id: { in: [senderId, receiverId] } },
      });
      if (users < 2) return { success: false, message: "User not found" };
      const newMessage = await prisma.message.create({
        data: { content, senderId, receiverId },
      });
      await pusherServer.trigger(room, "new-message", newMessage);
    } else if (type === "edit") {
      if (!messageId) return { success: false, message: "Message ID missing" };
      const updateMessage = await prisma.message.update({
        where: { id: messageId },
        data: { content },
      });
      await pusherServer.trigger(room, "update-message", updateMessage);
    }

    return { success: true };
  } catch (error) {
    console.error("Pusher or Prisma Error:", error);
    return { success: false, message: "Message action failed" };
  }
};
