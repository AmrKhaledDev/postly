import z from "zod";
// ============================================
export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string({ message: "New Password is required" })
      .min(8, { message: "Your password must contain 8 or more characters" })
      .max(64, { message: "New Password must not exceed 64 characters" })
      .nonempty({ message: "New Password is required" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "The two passwords do not match.",path:["confirmPassword"]
  });
