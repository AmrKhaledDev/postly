"use server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusherServer";
// =========================================================================
export const DeleteMessageAction = async (
  messageId: string,
  senderId: string,
  receiverId: string,
): Promise<{ success: boolean; message?: string }> => {
  if (!messageId)
    return { success: false, message: "The message is not found" };
  try {
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    });
    if (!message)
      return { success: false, message: "The message is not found" };
    const deleteMessage = await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    const room = [senderId, receiverId].sort().join("_");
    await pusherServer.trigger(room, "delete-message", deleteMessage);
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "The message cannot be deleted" };
  }
};
