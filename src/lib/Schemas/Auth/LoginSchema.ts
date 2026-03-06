import z from "zod";
// ========================================================
export const LoginSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email must not exceed 100 characters" })
    .trim(),

  password: z
    .string({ message: "Password is required" })
    .min(8, { message: "Your password must contain 8 or more characters" })
    .max(64, { message: "Password must not exceed 64 characters" }),
});
