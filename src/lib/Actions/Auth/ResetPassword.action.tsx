"use server";
import { prisma } from "@/lib/prisma";
import { ResetPasswordSchema } from "@/lib/Schemas/Auth/ResetPasswordSchema";
import bcrypt from "bcryptjs";
import { createHash } from "node:crypto";
// ==================================
export const ResetPasswordAction = async (
  verifyToken: string,
  newPassword: string,
  confirmPassword: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const validation = ResetPasswordSchema.safeParse({
      newPassword,
      confirmPassword,
    });
    if (!validation.success)
      return { success: false, message: validation.error.issues[0].message };
    const hashedToken = createHash("sha256").update(verifyToken).digest("hex");
    const token = await prisma.verificationToken.findUnique({
      where: {
        token: hashedToken,
      },
    });
    if (!token)
      return {
        success: false,
        message: "Your verification code is not found",
      };
    const isExpired = token.expires < new Date();
    if (isExpired)
      return { success: false, message: "Your verification code has expired" };
    const user = await prisma.user.findUnique({
      where: {
        email: token.identifier,
      },
    });
    if (!user)
      return {
        success: false,
        message:
          "Your password cannot be changed because your account is not available on our servers",
      };
    const hashedPassword = await bcrypt.hash(newPassword,12)
    await prisma.$transaction([
      prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPassword,
        },
      }),
      prisma.verificationToken.delete({
        where: {
          token: token.token,
        },
      }),
    ]);
    return {
      success: true,
      message: "The password has been successfully changed",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Password cannot be changed" };
  }
};
