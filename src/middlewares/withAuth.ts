import {
  NextMiddleware,
  NextRequest,
  NextResponse,
  NextFetchEvent,
} from 'next/server';

export default function withAuth(
  middleware: NextMiddleware,
  requiredAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    // const token = await getToken({
    //   req,
    //   secret: process.env.NEXTAUTH_SECRET,
    // });

    // if (requiredAuth[0].includes(pathname)) {
    //   console.log('home', pathname);
    //   return NextResponse.rewrite(`${req.nextUrl.origin}/home`);
    // }
    // if (requiredAuth.includes(pathname)) {
    //   return NextResponse.rewrite(`${req.nextUrl.origin}/`);
    // }

    return middleware(req, next);
  };
}
