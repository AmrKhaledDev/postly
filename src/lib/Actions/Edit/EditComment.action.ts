"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ===============================
export const EditCommentAction = async (
  commentId: string,
  userSessionId: string,
  newContent: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!newContent.trim())
      return { success: false, message: "You cannot add an empty comment" };
    const comment = await prisma.comment.findUnique({
      where: {
        id: commentId,
      },
    });
    if (!comment)
      return {
        success: false,
        message: "The comment that needs to be edited does not exist",
      };
    const user = await prisma.user.findUnique({
      where: {
        id: userSessionId,
      },
    });
    if (!user || comment.userId !== userSessionId)
      return { success: false, message: "You cannot edit this comment" };
    await prisma.comment.update({
      where: {
        id: comment.id,
      },
      data: {
        content: newContent,
      },
    });
    revalidatePath("/feed")
    return {success:true,message:"The comment was successfully edited"}
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "We were unable to edit your comment. Please try again.",
    };
  }
};
