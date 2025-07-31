// // middleware.js
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   // Skip middleware untuk halaman device-warning agar tidak infinite loop
//   if (request.nextUrl.pathname === '/device-warning') {
//     return NextResponse.next();
//   }

//   // Skip middleware untuk static files
//   if (request.nextUrl.pathname.startsWith('/api') ||
//       request.nextUrl.pathname.startsWith('/_next') ||
//       request.nextUrl.pathname.includes('.')) {
//     return NextResponse.next();
//   }

//   const userAgent = request.headers.get("user-agent") || "";

//   // Debug log (hapus setelah testing)
//   console.log('User Agent:', userAgent);

//   // Deteksi device yang lebih komprehensif
//   const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(userAgent);
//   const isTablet = /ipad|android(?!.*mobile)|tablet/i.test(userAgent);
//   const isDesktop = !isMobile && !isTablet;

//   // Debug log (hapus setelah testing)
//   console.log('Is Mobile:', isMobile, 'Is Tablet:', isTablet, 'Is Desktop:', isDesktop);

//   // Redirect jika bukan desktop
//   if (!isDesktop) {
//     console.log('Redirecting to device-warning');
//     return NextResponse.redirect(new URL("/device-warning", request.url));
//   }

//   return NextResponse.next();
// }

// // Config untuk menentukan path mana yang akan dijalankan middleware
// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      * - public files dengan extension
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
//   ],
// }
