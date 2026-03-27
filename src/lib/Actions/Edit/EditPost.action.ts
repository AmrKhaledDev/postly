"use server";
import { prisma } from "@/lib/prisma";
import { pusherServer } from "@/lib/pusherServer";
import { revalidatePath } from "next/cache";
// =======================================================
type Data = {
  postId: string;
  content?: string;
  mediaType?: string;
  media?: string;
};
export const EditPostAction = async (
  data: Data,
): Promise<{ success: boolean; message: string }> => {
  const { postId, content, media, mediaType } = data;
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });
    if (!post)
      return {
        success: false,
        message: "The post that needs to be edited does not exist.",
      };
    const postEdited = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        content: content || "",
        media: media,
        mediaType: mediaType || post.mediaType,
      },
      include: {
        user: true,
        loves: true,
        comments: {
          include: {
            user: true,
          },
        },
        savePosts: {
          include: {
            user: true,
          },
        },
      },
    });
    await pusherServer.trigger("posts-feed", "edit-post", postEdited);
    revalidatePath("/feed");
    return {
      success: true,
      message: "The post has been successfully edited. Enjoy!",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "This post cannot be edited" };
  }
};
