import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const url = new URL("/login", request.url); // <-- ABSOLUTE URL FIX

    const response = NextResponse.redirect(url);

    // Clear token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    // Clear role cookie
    response.cookies.set("role", "", {
      path: "/",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error("LOGOUT ERROR:", error);
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
