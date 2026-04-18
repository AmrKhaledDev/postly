import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/Schemas/Auth/LoginSchema";
import bcrypt from "bcryptjs";
// =======================================================================================
export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.sub = user.id;
      return token;
    },
    async session({ session, token }) {
      if (!token?.sub) return session;
      session.user.id = token.sub;
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
    Credentials({
      async authorize(data) {
        try {
          const validation = LoginSchema.safeParse(data);
          if (!validation.success) return null;
          const isExistingUser = await prisma.user.findUnique({
            where: {
              email: validation.data.email,
            },
          });
          if (!isExistingUser) return null;
          if (!isExistingUser.password) return null;
          const checkPassword = await bcrypt.compare(
            validation.data.password,
            isExistingUser.password,
          );
          if (!checkPassword) return null;
          return isExistingUser;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages:{
    signIn:"/sign-in"
  }
});
