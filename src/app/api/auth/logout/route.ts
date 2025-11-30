import { NextResponse } from "next/server";

export async function GET(request: Request) {
  return handleLogout(request);
}

export async function POST(request: Request) {
  return handleLogout(request);
}

function handleLogout(request: Request) {
  const loginURL = new URL("/login", request.url);

  const response = NextResponse.redirect(loginURL);

  // Clear cookies
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
