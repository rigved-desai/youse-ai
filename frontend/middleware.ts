import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const API_BASE_URL = process.env.API_BASE_URL;

export async function middleware(request: NextRequest) {
  const authToken = request.cookies.get('tasks-auth-token');
  const path = request.nextUrl.pathname;
  if (!authToken) {
    if (path === `/login` || path === '/sign-up') {
      return;
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }
  try {
    const resp = await fetch(`${API_BASE_URL}/auth/validate-token`, {
      headers: {
        Authorization: `Bearer ${authToken.value}`,
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) {
      request.cookies.delete('tasks-auth-token');
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (path === '/sign-up' || path === '/login') {
      return NextResponse.redirect(new URL('/tasks', request.url));
    }
    return;
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },

    {
      source: '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
      has: [{ type: 'header', key: 'x-present' }],
      missing: [{ type: 'header', key: 'x-missing', value: 'prefetch' }],
    },
  ],
};
