import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const url = new URL("/login", request.url);

  const response = NextResponse.redirect(url);

  response.cookies.set("token", "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });

  response.cookies.set("role", "", {
    path: "/",
    expires: new Date(0),
  });

  return response;
}
