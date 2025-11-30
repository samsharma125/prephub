import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const loginURL = new URL("/login", request.url);

  const response = NextResponse.redirect(loginURL);
response.cookies.set("token", "", {
  httpOnly: true,
  path: "/",
  expires: new Date(0),
  domain: "prephub1.vercel.app",   // ✅ MUST MATCH
});

response.cookies.set("role", "", {
  path: "/",
  expires: new Date(0),
  domain: "prephub1.vercel.app",   // ✅ MUST MATCH
});

  return response;
}
