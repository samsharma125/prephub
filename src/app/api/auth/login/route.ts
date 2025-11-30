import { NextResponse } from "next/server";
import { loginSchema } from "@/lib/validators";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";    // ✔ FIXED
import { signToken } from "@/lib/auth";
import { dbConnect } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const { email, password, role } = parsed.data;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.password);

    if (!ok || user.role !== role) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = signToken({
      userId: user._id.toString(),
      email,
      role,
       name: user.name,  
    });

    const res = NextResponse.json({ ok: true });

    // ✔ FIXED
    res.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: "prephub1.vercel.app", 
      })
    );

    // ✔ FIXED
    res.headers.append(
      "Set-Cookie",
      serialize("role", role, {
        sameSite: "lax",
        path: "/",
      })
    );

    return res;
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
