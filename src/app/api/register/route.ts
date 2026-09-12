import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { fullName, phone, email, password } = body;

    // 1. Check required fields
    if (!fullName || !phone || !password) {
      return Response.json(
        {
          success: false,
          message: "Full name, phone number and password are required.",
        },
        { status: 400 }
      );
    }

    // 2. Check whether phone or email already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { phone },
          ...(email ? [{ email }] : []),
        ],
      },
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "Phone number or email is already registered.",
        },
        { status: 409 }
      );
    }

    // 3. Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // 4. Create the customer
    const user = await prisma.users.create({
      data: {
        full_name: fullName,
        phone,
        email: email || null,
        password_hash: passwordHash,
        role: "customer",
      },
      select: {
        user_id: true,
        full_name: true,
        phone: true,
        email: true,
        role: true,
        created_at: true,
      },
    });

    // 5. Return the newly created user
    return Response.json(
      {
        success: true,
        message: "Account created successfully.",
        user,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration error:", error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong while creating the account.",
      },
      { status: 500 }
    );
  }
}