import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// DELETE - Delete a PDF
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ pdfId: string }> }
) {
  try {
    const { pdfId } = await params;
    
    if (!pdfId) {
      return NextResponse.json(
        { error: "PDF ID is required" },
        { status: 400 }
      );
    }

    // Check if PDF exists
    const existingPdf = await prisma.pdf.findUnique({
      where: { id: pdfId }
    });

    if (!existingPdf) {
      return NextResponse.json(
        { error: "PDF not found" },
        { status: 404 }
      );
    }

    // Delete PDF
    await prisma.pdf.delete({
      where: { id: pdfId }
    });

    return NextResponse.json({
      success: true,
      message: "PDF deleted successfully"
    });
  } catch (error) {
    console.error("Failed to delete PDF:", error);
    return NextResponse.json(
      { error: "Failed to delete PDF" },
      { status: 500 }
    );
  }
}
