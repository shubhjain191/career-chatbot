import NextAuth, {type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;
                const email = credentials.email.toLowerCase().trim();
                const user = await prisma.user.findUnique({ where: { email } });
                if (!user || !user.password) return null;
                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;
                return { 
                    id: user.id, 
                    email: user.email, 
                    name: user.name ?? null, 
                    image: null 
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user?.id) token.sub = user.id;
            return token;
        },
        async session({ session, token }) {
            if (session.user && token.sub) session.user.id = token.sub;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };