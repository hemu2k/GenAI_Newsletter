import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const protectedPaths = ['/admin', '/api/send', '/api/issues', '/issues/new'];
  const needsAuth = protectedPaths.some(p => pathname.startsWith(p));
  if (!needsAuth) return NextResponse.next();

  const auth = req.headers.get('authorization');
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASS;
  const expected = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
  if (auth !== expected) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/send', '/api/issues', '/issues/new']
};
