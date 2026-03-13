import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ===============================================================
export const getUsers = Cache(
  async () => {
    const users = await prisma.user.findMany({
      take: 6,
    });
    return users;
  },
  ["users"],
  { revalidate: 3600 },
);
