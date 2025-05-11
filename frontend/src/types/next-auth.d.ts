import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      applicant_id: number;
      email: string;
      name: string;
      profile: string;
      token: string;
    };
  }

  interface User {
    applicant_id: number;
    email: string;
    name: string;
    profile: string;
    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    applicant_id: number;
    email: string;
    name: string;
    profile: string;
    token: string;
  }
}
