import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnEditPost =
        nextUrl.pathname.startsWith("/create") ||
        nextUrl.pathname.startsWith("/edit");
      if (isOnEditPost && !isLoggedIn) {
        return false;
      }
      return true;
    }
  },
  providers: [],
} satisfies NextAuthConfig;
