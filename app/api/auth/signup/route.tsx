import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import User from "@/app/models/User";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
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

interface signUpValidation {
  name?: string;
  email?: string;
  password?: string[];
}

const validationErrors = (
  validationData: z.SafeParseReturnType<SignUpBody, any>
) => {
  const formErrors: signUpValidation = {};
  const errors = validationData.error?.flatten().fieldErrors;
  if (errors) {
    if (errors.name) formErrors.name = errors.name[0];
    if (errors.email) formErrors.email = errors.email[0];
    if (errors.password) formErrors.password = errors.password;
  }
  return formErrors;
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body: SignUpBody = await request.json();

    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validationErrors(validation) },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: body.email });

    if (user) {
      return NextResponse.json(
        { message: "User already exists!" },
        { status: 400 }
      );
    } else {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      const newUser = new User({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });
      await newUser.save();

      return NextResponse.json({ message: "User created!" }, { status: 201 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
