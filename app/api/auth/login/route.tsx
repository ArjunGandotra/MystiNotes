import connection from "@/app/lib/db/mongoDB";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const data: LoginBody = { email, password };

  const validation = schema.safeParse({ email, password });
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const db = await connection();
  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: "Invalid password" }, { status: 400 });
  }

  const payload: { user: { id: string; email: string } } = {
    user: {
      id: user._id.toString(),
      email: user.email,
    },
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: "4h",
  });

  return NextResponse.json({ token }, { status: 200 });
}
