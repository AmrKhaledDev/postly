import { Prisma } from "@prisma/client";
// ============================================================================
export type StoryType = Prisma.StoryGetPayload<{
  include: {
    user: true;
  };
}>;
export type UserDbType = Prisma.UserGetPayload<{
  include: {
    posts: {
      include: {
        user: true;
      };
    };
  };
}>;
export type PostDbCacheType = Prisma.PostGetPayload<{
  include: {
    user: true;
  };
}>;
