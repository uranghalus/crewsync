import {
  apiAuthPrefix,
  publicRoutes,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from './lib/routes';
import { auth } from './lib/auth/auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // Jika ini rute autentikasi API
  if (isApiAuthRoute) {
    return; // void (bukan null)
  }
  // Jika ini rute autentikasi
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl)); // Redirect ke halaman default setelah login
    }
    return; // void (bukan null)
  }

  // Jika ini bukan rute publik dan pengguna belum login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/', nextUrl.origin)); // Redirect ke halaman signin
  }

  return; // void (bukan null)
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|public/.*|favicon.ico).*)'],
};
