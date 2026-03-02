import { auth as proxy } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { GetSession } from "./lib/GetSession";
import { User } from "@prisma/client";
// ==================================================================
const authRoutes = ["/", "/sign-in", "/register"];
export default proxy(async (req: NextRequest) => {
  const pathname = req.nextUrl.pathname;
  const userSession: User | null = await GetSession();
  if (authRoutes.includes(pathname) && userSession)
    return NextResponse.redirect(new URL("/feed", req.nextUrl.origin));
  if (pathname.startsWith("/feed") && !userSession)
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
});
export const config = {
  matchers: ["/", "/sign-in", "/register", "/feed"],
};
