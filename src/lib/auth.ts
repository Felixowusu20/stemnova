import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/db";
import { getAuthSecret } from "@/lib/env";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const authSecret = getAuthSecret();
if (!authSecret && process.env.NODE_ENV === "production") {
  console.error(
    "[auth] AUTH_SECRET / NEXTAUTH_SECRET is not set. Admin sign-in will fail in production."
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret || undefined,
  trustHost: true,
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (raw) => {
        try {
          const parsed = credentialsSchema.safeParse(raw);
          if (!parsed.success) return null;

          const email = parsed.data.email.toLowerCase().trim();
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user?.passwordHash) return null;

          const valid = await compare(parsed.data.password, user.passwordHash);
          if (!valid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name ?? "Admin",
            role: user.role,
          };
        } catch (error) {
          console.error("[auth] authorize failed:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "ADMIN";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "ADMIN";
      }
      return session;
    },
  },
});
