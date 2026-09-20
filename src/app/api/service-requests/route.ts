import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;

    if (!sessionToken) {
      return Response.json(
        {
          success: false,
          message: "You must be logged in to submit a service request.",
        },
        { status: 401 }
      );
    }

    const session = await verifySession(sessionToken);

    if (!session) {
      return Response.json(
        {
          success: false,
          message: "Your session has expired. Please log in again.",
        },
        { status: 401 }
      );
    }

    if (session.role !== "customer") {
      return Response.json(
        {
          success: false,
          message: "Only customers can create service requests.",
        },
        { status: 403 }
      );
    }

    const body = await request.json();

    const {
      serviceCategory,
      description,
      location,
    } = body;

    if (!serviceCategory || !description || !location) {
      return Response.json(
        {
          success: false,
          message:
            "Service category, description and location are required.",
        },
        { status: 400 }
      );
    }

    const serviceRequest =
      await prisma.service_requests.create({
        data: {
          customer_id: session.userId,
          service_category: serviceCategory,
          description,
          location,
          status: "pending",
        },
      });

    return Response.json(
      {
        success: true,
        message: "Service request created successfully.",
        request: serviceRequest,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Service request error:", error);

    return Response.json(
      {
        success: false,
        message:
          "Something went wrong while creating the service request.",
      },
      { status: 500 }
    );
  }
}