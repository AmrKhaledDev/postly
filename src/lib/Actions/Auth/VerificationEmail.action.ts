"use server";
import { prisma } from "@/lib/prisma";
import { createHash } from "node:crypto";
// ==================================
export const VerificationAction = async (
  verificationToken: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    const hashedToken = createHash("sha256")
      .update(verificationToken)
      .digest("hex");
    const token = await prisma.verificationToken.findUnique({
      where: {
        token: hashedToken,
      },
    });
    if (!token)
      return {
        success: false,
        message: "Invalid verification link or code",
      };
    const isExpired = token.expires < new Date();
    if (isExpired) {
      await prisma.verificationToken.delete({
        where: {
          token: token.token,
        },
      });
      return { success: false, message: "This verification link has expired" };
    }
    const user = await prisma.user.findUnique({
      where: {
        email: token.identifier,
      },
      select: { id: true, emailVerified: true },
    });
    if (!user)
      return {
        success: false,
        message:
          "Your email verification failed. Please re-create your account again",
      };
    if (user.emailVerified)
      return { success: true, message: "Your email is already verified" };
    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
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
      message: "Your email has been successfully verified",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "We couldn't verify your email. Please sign up again",
    };
  }
};
