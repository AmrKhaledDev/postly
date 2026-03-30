"use server";
import { sendResetPasswordLink } from "@/lib/email/sendResetPasswordLink";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
// ================================================
export const ForgotPasswordAction = async (
  email: string,
): Promise<{ success: boolean; message: string }> => {
  try {
    if (!email.trim())
      return { success: false, message: "The email address must not be empty" };
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: { email: true },
    });
    if (!user)
      return {
        success: false,
        message:
          "If an account with this email exists, a password reset link has been sent successfully",
      };
    const verificationToken = await generateVerificationToken(email);
    if ("error" in verificationToken)
      return { success: false, message: verificationToken.error! };
    const result = await sendResetPasswordLink(email, verificationToken.token);
    if (!result.success) return { success: false, message: result.message };
    return { success: true, message: result.message };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "The link could not be sent. Please try again",
    };
  }
};
