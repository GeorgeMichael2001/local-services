import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { phone, password } = body;

    if (!phone || !password) {
      return Response.json(
        {
          success: false,
          message: "Phone number and password are required.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: {
        phone,
      },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Invalid phone number or password.",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatch) {
      return Response.json(
        {
          success: false,
          message: "Invalid phone number or password.",
        },
        { status: 401 }
      );
    }

    const token = await createSession(
      user.user_id,
      user.role
    );

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json(
      {
        success: true,
        message: "Login successful.",
        user: {
          user_id: user.user_id,
          full_name: user.full_name,
          phone: user.phone,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while logging in.",
      },
      { status: 500 }
    );
  }
}
