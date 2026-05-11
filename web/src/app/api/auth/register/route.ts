import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  const normalizedEmail =
    typeof email === "string" ? email.trim().toLowerCase() : "";

  if (
    typeof name !== "string" ||
    !normalizedEmail ||
    typeof password !== "string" ||
    password.length < 8
  ) {
    return NextResponse.json(
      { message: "Name, email, and an 8+ character password are required." },
      { status: 400 }
    );
  }

  const existingUser = await db.user.findUnique({
    where: { email: normalizedEmail },
    select: { id: true },
  });

  if (existingUser) {
    return NextResponse.json(
      { message: "An account with this email already exists." },
      { status: 409 }
    );
  }

  await db.user.create({
    data: {
      name: name.trim(),
      email: normalizedEmail,
      password: await hash(password, 12),
    },
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
