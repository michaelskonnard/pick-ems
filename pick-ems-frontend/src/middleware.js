// middleware.js
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import axios from './api/axios';

export const refreshTokens = async (refreshToken, req) => {
  if (!refreshToken)
    return NextResponse.redirect(new URL('/login', req.url));
  await axios
    .get('auth/refresh', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
    .then(async (res) => {
      let token;
      const setCookieHeader = res.headers['set-cookie'];
      if (setCookieHeader) {
        let cList = [];
        for (const match of setCookieHeader.matchAll(
          /jwt=([^;,]+)(?:,|;)/g
        )) {
          cList.push(match[1]);
        }
        token = cList[0];
      }

      // If there's no token, redirect to login
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Verify the token
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
    })
    .catch((error) => {
      // console.error('Error:', error);
      return NextResponse.redirect(new URL('/login', req.url));
    });
  return true;
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  // Define unprotected routes
  const unprotectedRoutes = ['/login', '/register'];

  // If the path is in the unprotectedRoutes, let the request pass
  if (unprotectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the JWT from cookies
  const token = req.cookies.get('jwt')?.value;

  // If there's no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const decode = await jwtVerify(token, secret);

    // If the token is valid, let the request pass
    return NextResponse.next();
  } catch (err) {
    let refreshed;
    if (err.name === 'JWTExpired') {
      refreshed = refreshTokens(
        req.cookies.get('refresh')?.value,
        req
      );
    }

    if (refreshed) return NextResponse.next();

    // If the token is invalid or expired, redirect to login
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next|api/auth).*)(.+)'],
};
