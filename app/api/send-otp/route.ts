// app/api/send-otp/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import domains from "disposable-email-domains";

const prisma = new PrismaClient();

function isDisposableEmail(email: string): boolean {
   
  const domain = email.split("@")[1];
  return domains.includes(domain);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (isDisposableEmail(email)) {
      return NextResponse.json(
        { error: "Disposable emails not allowed" },
        { status: 400 }
      );
    }

    const otp = Math.random().toString().substring(2, 8);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otp.upsert({
      where: { email },
      create: { email, otp, expiresAt },
      update: { otp, expiresAt },
    });

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Your London Tiles Login OTP",
      text: `Your OTP is: ${otp}\nExpires in 10 minutes`,
    });
    
         console.log("sending otp from backend",otp);


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("OTP send error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}