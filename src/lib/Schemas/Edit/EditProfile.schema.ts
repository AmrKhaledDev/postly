import z from "zod";
// =========================================================================
export const EditProfileSchema = z.object({
  userId: z.string().nonempty({
    message: "Your profile update failed. You were not recognized",
  }),
  fullName: z
    .string({ message: "Full name is required" })
    .min(2, { message: "Full name must be at least 2 characters" })
    .max(20, { message: "Full name must be less than 20 characters" }),

  username: z
    .string()
    .max(20, { message: "Username must be less than 20 characters" })
    .regex(/^[a-z0-9_]+$/, {
      message:
       "Username can only include lowercase letters (a–z), numbers (0–9), and underscores (_). No spaces or special characters allowed"
    })
    .optional()
    .or(z.literal("")),

  bio: z
    .string()
    .max(160, { message: "Bio must be less than 160 characters" })
    .optional()
    .or(z.literal("")),

  location: z
    .string()
    .max(50, { message: "Location must be less than 50 characters" })
    .optional()
    .or(z.literal("")),
  cover: z.string().optional().or(z.literal("")),
  picture: z.string().optional().or(z.literal("")),
});
