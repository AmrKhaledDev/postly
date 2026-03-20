"use server";
import { prisma } from "@/lib/prisma";
// =================================================================
type Data = {
  type: string;
  content: string;
  senderId?: string;
  receiverId?: string;
  messageId?: string;
};
export const MessageAction = async (
  data: Data,
): Promise<{ success: boolean; message?: string }> => {
  const { content, receiverId, senderId, type, messageId } = data;
  if (!content?.trim())
    return { success: false, message: "You cannot send an empty message" };
  try {
    if (type === "create") {
      if (!senderId || !receiverId)
        return {
          success: false,
          message: "An unexpected error occurred while sending the message",
        };
      const users = await prisma.user.count({
        where: {
          id: { in: [senderId, receiverId] },
        },
      });
      if (users < 2)
        return {
          success: false,
          message: "An unexpected error occurred while sending the message",
        };
      await prisma.message.create({
        data: {
          content,
          senderId,
          receiverId,
        },
      });
    } else if (type === "edit") {
      await prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          content,
          isEdited: true,
        },
      });
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Message failed to send" };
  }
};
