import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { password, testId } = await req.json();

    // Get the global settings
    const settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      return NextResponse.json(
        { success: false, message: "Settings not found" },
        { status: 404 }
      );
    }
    console.log(settings);

    // Verify password
    if (password === settings.mockTestPassword) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { success: false, message: "Incorrect password" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error verifying password:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
