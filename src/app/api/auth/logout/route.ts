import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const origin = new URL(request.url).origin; // https://prephub1.vercel.app
  const loginURL = `${origin}/login`;        // forces GET

  const response = NextResponse.redirect(loginURL, {
    status: 302, // ensure GET redirect
  });

  // Clear cookies
  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
    domain: "prephub1.vercel.app",
  });

  response.cookies.set("role", "", {
    path: "/",
    expires: new Date(0),
    domain: "prephub1.vercel.app",
  });

  return response;
}
