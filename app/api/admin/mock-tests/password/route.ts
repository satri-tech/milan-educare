import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET: Get current mock test password
export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { id: "global" },
    });

    if (!settings) {
      return NextResponse.json(
        { error: "Global settings not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ password: settings.mockTestPassword });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch mock test password" },
      { status: 500 }
    );
  }
}

// PUT: Update mock test password
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.password || typeof body.password !== "string") {
      return NextResponse.json(
        { error: "Password must be a non-empty string" },
        { status: 400 }
      );
    }

    const settings = await prisma.settings.update({
      where: { id: "global" },
      data: { mockTestPassword: body.password },
    });

    return NextResponse.json({
      message: "Password updated successfully",
      password: settings.mockTestPassword,
    });
  } catch (error: any) {
    console.error("Error updating password:", error);

    if (
      error.code === "P2025" ||
      error.message?.includes("Record to update not found")
    ) {
      return NextResponse.json(
        { error: "Global settings not found to update" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Failed to update mock test password" },
      { status: 500 }
    );
  }
}
