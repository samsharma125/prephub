import { NextResponse } from "next/server";
import { signupSchema } from "@/lib/validators";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/lib/db";
import * as cookie from "cookie";
import { signToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { name, email, password, role } = parsed.data;

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
    });

    // <-- FIX: include `name` in the token payload
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name, // <--- required
    });

    const res = NextResponse.json({ ok: true });

    res.headers.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      })
    );

    res.headers.append(
      "Set-Cookie",
      cookie.serialize("role", user.role, {
        sameSite: "lax",
        path: "/",
      })
    );

    return res;
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
