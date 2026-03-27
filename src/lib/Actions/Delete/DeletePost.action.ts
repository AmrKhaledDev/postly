"use server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusherServer";
import { revalidatePath } from "next/cache";
// ==================================================
export const DeletePostAction = async (
  postId: string,
  userSessionId: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userSessionId,
      },
      select: { id: true },
    });
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!user || !post)
      return {
        success: false,
        message: "An error occurred while deleting the post",
      };
    if (user.id !== post.userId)
      return { success: false, message: "You cannot delete this post" };
    const postDeleted = await prisma.post.delete({
      where: {
        id: post.id,
      },
    });
    await pusherServer.trigger("posts-feed", "delete-post", postDeleted);
    revalidatePath("/feed");
    return { success: true, message: "Your post has been deleted" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "The post could not be deleted. Please try again",
    };
  }
};
