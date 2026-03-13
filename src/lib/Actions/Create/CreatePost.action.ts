"use server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
// ===================================================================
type DataType = {
  content?: string;
  media?: string;
  mediaType?: string;
  userId: string;
};
export const CreatePostAction = async (
  data: DataType,
): Promise<{ success: boolean; message: string }> => {
  const { content, media, mediaType, userId } = data;
  if (!userId)
    return { success: false, message: "An unexpected error occurred" };
  if (!content && !media)
    return { success: false, message: "You cannot create an empty post" };
  if (media && !mediaType)
    return {
      success: false,
      message: "An error occurred; the media type was not recognized",
    };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user)
      return { success: false, message: "An unexpected error occurred" };
    await prisma.post.create({
      data: {
        userId: user.id,
        content: content || null,
        media: media || null,
        mediaType: mediaType || null,
      },
    });
    revalidatePath("/feed");
    revalidatePath("/feed/profile");
    revalidatePath("/feed/u");
    return { success: true, message: "The post was sent" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Story creation failed. Please try again",
    };
  }
};
