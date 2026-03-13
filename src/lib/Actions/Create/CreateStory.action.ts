"use server";
import { prisma } from "@/lib/prisma";
// =============================================================
type CreateStory = {
  text?: string;
  media?: string;
  mediaType?: string;
  storyBg?: string;
  userId: string;
};
export const CreateStoryAction = async (
  data: CreateStory,
): Promise<{ success: boolean; message: string }> => {
  try {
    const { text, media, mediaType, userId, storyBg } = data;
    if (!userId)
      return {
        success: false,
        message: "Log in to create a story",
      };
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: { id: true },
    });
    if (!user)
      return {
        success: false,
        message: "Log in to create a story",
      };
    if (text && media)
      return {
        success: false,
        message: "The status cannot contain content and media",
      };
    if (text && text.trim().length < 1 && !media)
      return { success: false, message: "You cannot create an empty story" };
    await prisma.story.create({
      data: {
        userId: user.id,
        text: text || null,
        media: media || null,
        mediaType: mediaType || null,
        storyBg: storyBg || null,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });
    return {
      success: true,
      message: "Your status has been successfully created",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred story creation failed",
    };
  }
};
