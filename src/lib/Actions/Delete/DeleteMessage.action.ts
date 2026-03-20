"use server";
import { prisma } from "@/lib/prisma";
// =========================================================================
export const DeleteMessageAction = async (
  messageId: string,
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
    await prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "The message cannot be deleted" };
  }
};
