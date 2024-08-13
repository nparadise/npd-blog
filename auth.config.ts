import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, // 1 hour
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdminPage =
        nextUrl.pathname.startsWith("/create") ||
        nextUrl.pathname.startsWith("/edit") ||
        nextUrl.pathname.startsWith("/setting");
      if (isOnAdminPage && !isLoggedIn) {
        return false;
      }
      return true;
    },
    jwt({ token, user }) {
      try {
        // console.log("----------------------------");
        // console.log("User: ", user);
        // console.log("Account: ", account);
        // console.log("Profile: ", profile);
        if (user) {
          token.email = user.email;
        }
        return token;
      } catch (error) {
        throw error;
      }
    },
    session({ session, token }) {
      // console.log("----------------------------");
      // console.log("Session: ", session);
      // console.log("Token: ", token);
      session.user.email = token.email ?? "";
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
