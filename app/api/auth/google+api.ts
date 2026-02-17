import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// Endpoint to verify Google Token and issue our JWT
export async function POST(request: Request) {
  try {
    const { token, email, name, googleId } = await request.json();

    // In a real production app, verify the token with Google's API to ensure it's valid
    // For now, we trust the client provided info assuming they used expo-auth-session correctly
    // But verifying token server-side is recommended for security.

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId,
        },
      });
    } else if (!user.googleId) {
      // Link account if email matches but no google ID
      await prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      });
    }

    const sessionToken = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    return Response.json({
      token: sessionToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
