import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

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
    throw new Error('Invalid token')
  }
}