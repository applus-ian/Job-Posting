import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/api/auth";
import { ErrorResponse } from "@/types/error-response";
import axios from "axios";

// Define custom user type
interface CustomUser {
  id: string;
  email: string;
  applicant_id?: number;
  name?: string;
  token?: string;
  token_type?: string;
  userType?: 'hr' | 'employee';
  server?: '8000' | '8001';
  employee?: any;
}

// Type for credentials
interface AuthCredentials {
  email: string;
  password: string;
  userType?: string;
  server?: string;
}

// Extend NextAuth types
declare module "next-auth" {
  interface Session {
    user: CustomUser;
  }
  
  interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
  interface JWT extends CustomUser {}
}

// Hardcoded fallback values for environment variables
const NEXTAUTH_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000';
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || 'your-random-secret-key-at-least-32-characters';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
        server: { label: "Server", type: "text" },
      },
      // @ts-ignore - TypeScript is having issues with the return type, but the code works correctly
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        
        try {
          // If userType/server are passed in, it means we've already authenticated with our unified endpoint
          if (credentials.userType && credentials.server) {
            console.log('Using pre-authenticated credentials with type and server:', credentials.userType, credentials.server);
            // Return a user object based on the credentials
            return {
              id: "user", // We need an id for NextAuth
              email: credentials.email,
              name: credentials.email.split('@')[0], // Default name from email
              userType: credentials.userType,
              server: credentials.server
            };
          }

          // Legacy path - direct authentication against the HR server
          // Try our unified authentication first
          try {
            console.log('Trying unified auth from NextAuth authorize');
            const unifiedResponse = await axios.post(`${NEXTAUTH_URL}/api/auth`, {
              email: credentials.email,
              password: credentials.password,
            });

            const userData = unifiedResponse.data;
            console.log('Unified auth successful:', userData.userType);
            return {
              id: userData.id?.toString() || "user",
              email: userData.email,
              name: userData.name || userData.email.split('@')[0],
              token: userData.token,
              token_type: userData.token_type,
              userType: userData.userType,
              server: userData.server,
              employee: userData.employee
            };
          } catch (unifiedError) {
            console.error('Unified auth failed, falling back to legacy login');
            // Fall back to the legacy path if unified auth fails
            const response = await loginUser({
              email: credentials.email ?? "",
              password: credentials.password ?? "",
            });

            if (response) {
              console.log('Legacy HR login successful');
              return {
                id: response.id?.toString() || "user",
                email: response.email,
                name: response.name,
                token: response.token,
                token_type: response.token_type,
                applicant_id: response.applicant_id,
                userType: "hr",
                server: "8000",
                employee: response.employee
              };
            }
          }

          throw new Error("Invalid credentials");
        } catch (err: unknown) {
          console.error('Authorization error:', err);
          const error = err as ErrorResponse;
          const message = 
            error?.response?.data?.message || 
            (error?.response?.data as any)?.error || 
            "Login failed";
          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    // @ts-ignore - TypeScript has issues with the custom properties
    async jwt({ token, user }) {
      console.log('JWT callback - user:', user ? 'present' : 'not present');
      // Store user data from the unified auth in the token
      if (user) {
        token.email = user.email;
        token.name = user.name;
        
        // Add custom properties from our unified auth
        if (user.token) token.token = user.token;
        if (user.token_type) token.token_type = user.token_type;
        if (user.applicant_id) token.applicant_id = user.applicant_id;
        if (user.userType) token.userType = user.userType;
        if (user.server) token.server = user.server;
        
        // Make sure employee data is properly included, especially the department
        if (user.employee) {
          console.log('Employee data in JWT callback:', user.employee);
          token.employee = user.employee;
        }
      }
      
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - populating user data');
      // Add user info to the session
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      
      // Add custom properties to the session
      // @ts-ignore - Adding custom properties
      if (token.token) session.user.token = token.token;
      // @ts-ignore - Adding custom properties
      if (token.token_type) session.user.token_type = token.token_type;
      // @ts-ignore - Adding custom properties
      if (token.applicant_id) session.user.applicant_id = token.applicant_id;
      // @ts-ignore - Adding custom properties
      if (token.userType) session.user.userType = token.userType;
      // @ts-ignore - Adding custom properties
      if (token.server) session.user.server = token.server;
      // @ts-ignore - Adding custom properties
      if (token.employee) {
        console.log('Employee data in session callback:', token.employee);
        session.user.employee = token.employee;
      }
      
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
