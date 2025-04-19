// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { authPages } from '@/lib/auth-config';

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('token')?.value;
  const sessionToken = req.cookies.get('next-auth.session-token')?.value;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  // Skip auth for static files and API routes
  if (
    req.nextUrl.pathname.startsWith('/_next/') || 
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }

  // 1. First check your custom token for /admin/dashboard
  if (req.nextUrl.pathname.startsWith('/admin/dashboard') && !token) {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // 2. Then check NextAuth session for other admin routes
  if (isAdminRoute && !sessionToken) {
    return NextResponse.redirect(new URL(authPages.signIn, req.url));
  }

  return NextResponse.next();
}