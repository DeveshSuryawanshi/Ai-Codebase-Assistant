import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const question =
    typeof body === "object" && body !== null && "question" in body
      ? body.question
      : undefined;

  if (typeof question !== "string" || !question.trim()) {
    return NextResponse.json(
      { message: "A non-empty question is required." },
      { status: 400 }
    );
  }

  try {
    const upstreamResponse = await fetch(`${env.CODEBASE_ASSISTANT_API_URL}/api/v2/ask-question`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question.trim() }),
      cache: "no-store",
    });

    const contentType = upstreamResponse.headers.get("content-type");

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: contentType ? { "Content-Type": contentType } : undefined,
    });
  } catch {
    return NextResponse.json(
      { message: "The codebase assistant service is unavailable." },
      { status: 502 }
    );
  }
}
