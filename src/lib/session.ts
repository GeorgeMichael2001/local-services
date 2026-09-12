import { SignJWT, jwtVerify } from "jose";

const secret = process.env.SESSION_SECRET;

if (!secret) {
  throw new Error("SESSION_SECRET is not configured");
}

const encodedSecret = new TextEncoder().encode(secret);

export type SessionPayload = {
  userId: number;
  role: string;
};

export async function createSession(
  userId: number,
  role: string
) {
  const token = await new SignJWT({
    userId,
    role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedSecret);

  return token;
}

export async function verifySession(token: string) {
  try {
    const { payload } = await jwtVerify(
      token,
      encodedSecret
    );

    return {
      userId: Number(payload.userId),
      role: String(payload.role),
    };
  } catch {
    return null;
  }
}
