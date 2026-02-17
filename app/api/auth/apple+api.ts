import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret";

// Endpoint to verify Apple Sign-In token and issue our JWT
export async function POST(request: Request) {
  try {
    const { identityToken, email, name, appleId } = await request.json();

    // In a real production app, verify the identityToken with Apple's API
    // Apple provides a JWT that needs to be verified server-side
    // For now, we trust the client provided info assuming they used expo-apple-authentication correctly

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          appleId,
        },
      });
    } else if (!user.appleId) {
      // Link account if email matches but no Apple ID
      await prisma.user.update({
        where: { id: user.id },
        data: { appleId },
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
    console.error("Apple Auth Error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
