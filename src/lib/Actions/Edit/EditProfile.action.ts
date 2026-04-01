"use server";
import { prisma } from "@/lib/prisma";
import { EditProfileSchema } from "@/lib/Schemas/Edit/EditProfile.schema";
import { revalidatePath } from "next/cache";
import z from "zod";
// ===========================================
type Data = z.infer<typeof EditProfileSchema>;
export const EditProfileAction = async (
  data: Data,
): Promise<{ success: boolean; message: string }> => {
  const validation = EditProfileSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: validation.error.issues[0].message };
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: data.userId,
      },
    });
    if (!user)
      return {
        success: false,
        message: "Log in or create an account to edit your profile",
      };
    if (data.username) {
      const isExistingUserName = await prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });
      if (isExistingUserName && isExistingUserName.username !== user.username)
        return { success: false, message: "The username already exists" };
    }
    await prisma.user.update({
      where: {
        id: data.userId,
      },
      data: {
        name: data.fullName,
        cover: data.cover,
        image: data.picture,
        location: data.location,
        username: data.username,
        bio: data.bio,
      },
    });
    revalidatePath("/feed");
    revalidatePath("/feed/discover");
    return {
      success: true,
      message: "Your profile has been successfully edited",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Profile editing failed. Please try again later",
    };
  }
};
