import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/api/auth";
import { ErrorResponse } from "@/types/error-response";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const response = await loginUser({
            email: credentials?.email ?? "",
            password: credentials?.password ?? "",
          });

          if (response) {
            return response;
          }

          throw new Error("Invalid credentials");
        } catch (err: unknown) {
          const error = err as ErrorResponse;
          const message = error?.response?.data?.message || "Login failed";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.applicant_id = user.applicant_id;
        token.email = user.email;
        token.name = user.name;
        token.profile = user.profile || "";
        token.token = user.token;
      }
      if (trigger === "update" && session?.user) {
        if (session.user.name) {
          token.name = session.user.name;
        }
        if (session.user.profile) {
          token.profile = session.user.profile;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        applicant_id: token.applicant_id,
        email: token.email,
        name: token.name,
        profile: token.profile || "",
        token: token.token,
      };
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
