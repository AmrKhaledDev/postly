import { Cache } from "../Cache/Cache";
import { prisma } from "@/lib/prisma";
// ===============================================================
export const getPosts = Cache(
  async () => {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  },
  ["posts"],
  { revalidate: 3600 },
);
