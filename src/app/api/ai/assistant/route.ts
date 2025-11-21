import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant", // ✅ WORKING MODEL
      messages: [
        {
          role: "system",
          content: "You are PrepHub Copilot — a helpful AI assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = completion.choices[0]?.message?.content || "No response";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("GROQ ERROR:", error);
    return NextResponse.json(
      { reply: "Something went wrong." },
      { status: 500 }
    );
  }
}
