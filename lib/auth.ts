import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const users = [
          {
            id: "1",
            name: "Admin",
            email: "admin@test.com",
            password: "admin",
            role: "admin",
          },
          {
            id: "2",
            name: "User",
            email: "user@test.com",
            password: "admin",
            role: "user",
          },
        ];

        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password,
        );

        if (!user) return null;

        // Check if userType matches role
        if (credentials.userType && user.role !== credentials.userType) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
