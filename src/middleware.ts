import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ---- PUBLIC ROUTES (login, signup, home) ----
  if (pathname === '/login' || pathname === '/signup' || pathname === '/') {
    return NextResponse.next()
  }

  // ---- API AUTH ROUTES ----
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // ---- PROTECTED ROUTES ----
  const token = req.cookies.get('token')?.value
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      role: 'student' | 'admin'
    }

    // ---- ADMIN ROUTES ----
    if (pathname.startsWith('/faculty') && payload.role !== 'admin') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }
}

// Do NOT include /login inside matcher
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/activity/:path*',
    '/mock-test/:path*',
    '/my-projects/:path*',
    '/resume-builder/:path*',
    '/assignments/:path*',
    '/career-hub/:path*',
    '/calendar/:path*',
    '/ai-assistant/:path*',
    '/faculty/:path*',
    '/settings/:path*',
  ],
}
