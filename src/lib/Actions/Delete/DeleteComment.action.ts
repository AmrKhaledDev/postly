"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// =================================
export const DeleteCommentAction = async (
  commentId: string,
  userSessionId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment)
      return { success: false, message: "Your comment is not found" };
    const user = await prisma.user.findUnique({
      where: {
        id: userSessionId,
      },
    });
    if (!user || user.id !== comment.userId)
      return { success: false, message: "You cannot delete the comment" };
    await prisma.comment.delete({
      where: {
        id: comment.id,
      },
    });
    revalidatePath("/feed");
    return { success: true, message: "Your comment has been deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "We were unable to delete your comment. Please try again later",
    };
  }
};
