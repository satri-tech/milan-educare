import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// DELETE - Delete a topic
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    
    if (!topicId) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    // Check if topic exists
    const existingTopic = await prisma.topic.findUnique({
      where: { id: topicId }
    });

    if (!existingTopic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    // Delete topic (PDFs will be cascade deleted)
    await prisma.topic.delete({
      where: { id: topicId }
    });

    return NextResponse.json({
      success: true,
      message: "Topic deleted successfully"
    });
  } catch (error) {
    console.error("Failed to delete topic:", error);
    return NextResponse.json(
      { error: "Failed to delete topic" },
      { status: 500 }
    );
  }
}

// POST - Create a new PDF for the topic
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ topicId: string }> }
) {
  try {
    const { topicId } = await params;
    const body = await request.json();

    if (!topicId) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      );
    }

    if (!body.name || typeof body.name !== "string") {
      return NextResponse.json(
        { error: 'PDF name is required' },
        { status: 400 }
      );
    }

    if (!body.url || typeof body.url !== "string") {
      return NextResponse.json(
        { error: 'PDF URL is required' },
        { status: 400 }
      );
    }

    // Check if topic exists
    const topic = await prisma.topic.findUnique({
      where: { id: topicId }
    });

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      );
    }

    // Create new PDF
    const newPdf = await prisma.pdf.create({
      data: {
        name: body.name,
        url: body.url,
        topicId: topicId
      }
    });

    return NextResponse.json({
      success: true,
      message: "PDF added successfully",
      data: newPdf
    });
  } catch (error) {
    console.error("Failed to create PDF:", error);
    return NextResponse.json(
      { error: "Failed to create PDF" },
      { status: 500 }
    );
  }
}
