import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

interface LoginBody {
  email: string;
  password: string;
}

const logInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "At least 8 characters long." })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

interface logInValidation {
  email?: string;
  password?: string[];
}

const validationErrors = (
  validationData: z.SafeParseReturnType<LoginBody, any>
) => {
  const formErrors: logInValidation = {};
  const errors = validationData.error?.flatten().fieldErrors;
  if (errors) {
    if (errors.email) formErrors.email = errors.email[0];
    if (errors.password) formErrors.password = errors.password;
  }
  return formErrors;
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();

    const { email, password }: LoginBody = {
      email: body.email,
      password: body.password,
    };

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const validation = logInSchema.safeParse({ email, password });
    if (!validation.success) {
      return NextResponse.json(
        { error: validationErrors(validation) },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid password!" }, { status: 400 });
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

    localStorage.setItem("token", token);

    return NextResponse.json(
      { message: "Log In Successful!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
