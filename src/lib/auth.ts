import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET as string
if (!JWT_SECRET) throw new Error('Missing JWT_SECRET')

// 🔥 Add `name` here so JWT contains user’s name
export type TokenPayload = { 
  userId: string; 
  role: 'student' | 'admin'; 
  email: string;
  name: string;   // ⬅ NOW name is included
}

export function signToken(payload: TokenPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '15d' })
}

export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as TokenPayload
}

export function getAuth() {
  const store = cookies()
  const token = store.get('token')?.value
  if (!token) return null
  try { 
    return verifyToken(token) 
  } 
  catch { 
    return null 
  }
}
