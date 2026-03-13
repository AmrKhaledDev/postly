"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// =====================================================================
export const GetUserWithRelations = async () => {
  const session = await auth();

  if (!session?.user) return null;
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      stories: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return user || null;
};
