import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import { authOptions } from "@/lib/auth-config";

const prisma = new PrismaClient();

const handler = NextAuth({
  ...authOptions,
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.otp) {
            throw new Error("Missing credentials");
          }

          const storedOTP = await prisma.otp.findUnique({
            where: { email: credentials.email as string },
          });

          if (!storedOTP) throw new Error("OTP not found");
          if (storedOTP.otp !== credentials.otp) throw new Error("Invalid OTP");
          if (new Date() > storedOTP.expiresAt) throw new Error("OTP expired");

          let user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            user = await prisma.user.create({
              data: { email: credentials.email as string },
            });
          }

          await prisma.otp.delete({ where: { email: credentials.email as string } });
          return { id: user.id, email: user.email };
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
});

export { handler as GET, handler as POST };
