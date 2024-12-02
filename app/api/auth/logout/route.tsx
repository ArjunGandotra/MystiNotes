import { NextRequest, NextResponse } from "next/server";

export function POST(request: NextRequest) {
  const response = NextResponse.json(
    { message: "Sign Out Successful!" },
    { status: 200 }
  );
  response.cookies.set("token", "", {
    httpOnly: true,
    maxAge: 0,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return response;
}
