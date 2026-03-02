"use server";
import { signIn } from "@/auth";
import { sendVerificationToken } from "@/lib/email/sendVerificationToken";
import { generateVerificationToken } from "@/lib/generateVerificationToken";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/Schemas/Auth/LoginSchema";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import z from "zod";
// =====================================================
export const LoginAction = async (
  data: z.infer<typeof LoginSchema>,
): Promise<{ success: boolean; message: string }> => {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success)
    return { success: false, message: validation.error.issues[0].message };
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        email: validation.data.email,
      },
    });
    if (!isExistingUser)
      return { success: false, message: "Couldn't find your account" };
    if (!isExistingUser.password)
      return { success: false, message: "Please log in with Google" };
    const checkPassword = await bcrypt.compare(
      validation.data.password,
      isExistingUser.password,
    );
    if (!checkPassword)
      return { success: false, message: "Incorrect password" };
    if (!isExistingUser.emailVerified) {
      const verificationToken: { error: string } | { token: string } =
        await generateVerificationToken(validation.data.email);
      if ("error" in verificationToken)
        return { success: false, message: verificationToken.error };
      const result = await sendVerificationToken(
        validation.data.email,
        verificationToken.token,
      );
      if (!result.success) return { success: false, message: result.message };
      return { success: true, message: result.message };
    }
    await signIn("credentials", {
      email: validation.data.email,
      password: validation.data.password,
      redirect: false,
    });
    return { success: true, message: "Login successful" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          message: "Your account login failed. Please try again",
        };
      } else {
        return {
          success: false,
          message: "Google signin failed. Please try again",
        };
      }
    }
    return {
      success: false,
      message: "An error occurred while logging in. Please try again",
    };
  }
};
