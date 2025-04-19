import jwt from 'jsonwebtoken'
import { prisma } from './prisma'
import { auth } from "@/app/api/auth/[...nextauth]/route";

interface JWTPayload {
  id: string
  email: string
  role: string
}

export async function verifyAuth(token: string) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined')
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload

    const admin = await prisma.admin.findUnique({
      where: { 
        id: decoded.id,
        role: 'admin'
      }
    })

    if (!admin) {
      throw new Error('Unauthorized')
    }

    return decoded
  } catch (error) {
    console.error('Auth error:', error);
    throw new Error('Invalid token')
  }
}

export async function getCurrentUser() {
  const session = await auth();
  return session?.user;
}