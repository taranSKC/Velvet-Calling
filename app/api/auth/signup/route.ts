import { NextResponse } from "next/server";
import { db, usersTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Simple validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const trimmedName = String(name).trim();
    const normalizedEmail = String(email).toLowerCase().trim();
    const passwordStr = String(password);

    if (passwordStr.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUsers = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, normalizedEmail))
      .limit(1);

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 400 }
      );
    }

    // Hash the password securely using bcryptjs
    const passwordHash = bcrypt.hashSync(passwordStr, 10);

    // Insert user into D1 SQLite database
    const userId = crypto.randomUUID();
    await db.insert(usersTable).values({
      id: userId,
      name: trimmedName,
      email: normalizedEmail,
      password: passwordHash,
      role: "user", // Default role
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Account created successfully", userId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during signup" },
      { status: 500 }
    );
  }
}
