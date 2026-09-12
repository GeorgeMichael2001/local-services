import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";

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

    const sessionToken = await createSession(
      user.user_id,
      user.role
    );

    const response = Response.json(
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

    response.headers.set(
      "Set-Cookie",
      `session=${sessionToken}; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax${
        process.env.NODE_ENV === "production"
          ? "; Secure"
          : ""
      }`
    );

    return response;
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
