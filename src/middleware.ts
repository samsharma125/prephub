
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const PUBLIC_PATHS = ['/', '/login', '/signup', '/_next', '/favicon.ico']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  if (isPublic) return NextResponse.next()

  const token = req.cookies.get('token')?.value
  if (!token) return NextResponse.redirect(new URL('/login', req.url))

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as { role: 'student' | 'admin' }
    if (pathname.startsWith('/faculty') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

export const config = { matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'] }
