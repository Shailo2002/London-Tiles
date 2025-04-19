// lib/auth-config.ts
import { NextAuthOptions } from "next-auth";

export const authPages = {
  signIn: "/login",
  error: "/login",
  newUser: "/signup"
};

export const authOptions: NextAuthOptions = {
    pages: authPages,
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (!session.user) {
                session.user = {
                    email: token.email as string,
                    name: null,
                    image: null
                };
            }
            return session;
        },
    },
    providers: []
};