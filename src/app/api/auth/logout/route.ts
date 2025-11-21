import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.redirect(new URL("/login", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"));

    // Clear token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      path: "/",
      expires: new Date(0),
    });

    // Clear role cookie if you stored one
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
