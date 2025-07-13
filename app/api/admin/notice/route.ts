import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET - Retrieve current notice settings
export async function GET() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: "global" },
            select: {
                noticeImageUrl: true,
                isNoticeActive: true,
                updatedAt: true
            }
        });

        if (!settings) {
            return NextResponse.json(
                { error: "Settings not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(settings);
    } catch (error) {
        console.error("Error fetching notice settings:", error);
        return NextResponse.json(
            { error: "Failed to fetch notice settings" },
            { status: 500 }
        );
    }
}

// PUT - Update notice settings
export async function PUT(request: NextRequest) {
    try {
        const { isNoticeActive, noticeImageUrl } = await request.json();

        const settings = await prisma.settings.update({
            where: { id: "global" },
            data: {
                ...(typeof isNoticeActive === "boolean" && { isNoticeActive }),
                ...(noticeImageUrl && { noticeImageUrl })
            }
        });

        return NextResponse.json({
            message: "Notice settings updated successfully",
            settings: {
                noticeImageUrl: settings.noticeImageUrl,
                isNoticeActive: settings.isNoticeActive,
                updatedAt: settings.updatedAt
            }
        });
    } catch (error) {
        console.error("Error updating notice settings:", error);
        return NextResponse.json(
            { error: "Failed to update notice settings" },
            { status: 500 }
        );
    }
}

// DELETE - Remove notice image
export async function DELETE() {
    try {
        const settings = await prisma.settings.update({
            where: { id: "global" },
            data: {
                noticeImageUrl: null,
                isNoticeActive: false
            }
        });

        return NextResponse.json({
            message: "Notice image removed successfully",
            settings: {
                noticeImageUrl: settings.noticeImageUrl,
                isNoticeActive: settings.isNoticeActive,
                updatedAt: settings.updatedAt
            }
        });
    } catch (error) {
        console.error("Error removing notice image:", error);
        return NextResponse.json(
            { error: "Failed to remove notice image" },
            { status: 500 }
        );
    }
}
