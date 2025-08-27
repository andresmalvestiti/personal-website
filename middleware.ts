import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const comingSoon = process.env.ENABLE_COMING_SOON === "true"; // server-only flag
  const { pathname } = req.nextUrl;

  if (!comingSoon) return NextResponse.next();

  if (pathname === "/coming-soon") return NextResponse.next();

  const accept = req.headers.get("accept") || "";
  const isHTML = accept.includes("text/html");
  if (!isHTML) return NextResponse.next();

  return NextResponse.redirect(new URL("/coming-soon", req.url));
}

export const config = {
  matcher: "/:path*", // aplica a todas las rutas
};
