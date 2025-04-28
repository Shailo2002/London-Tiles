import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const token = req.cookies.get('admin-token')?.value;
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');

  // For debugging


  // Skip auth for static files and API routes
  if (
    req.nextUrl.pathname.startsWith('/_next/') || 
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/static/')
  ) {
    return NextResponse.next();
  }

  // Protect all /admin routes except login
  if (isAdminRoute && !token && req.nextUrl.pathname !== '/admin/login') {
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
