import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: DrizzleAdapter((db as any)._drizzleInstance || db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email).toLowerCase().trim();
        const password = String(credentials.password);

        // Fetch user from D1 database
        const rows = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email))
          .limit(1);

        const user = rows[0];

        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // Compare bcrypt hashes
        const isValid = bcrypt.compareSync(password, user.password);

        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
});
