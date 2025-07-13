import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

// GET - Retrieve current notice settings for public access
export async function GET() {
    try {
        const settings = await prisma.settings.findUnique({
            where: { id: "global" },
            select: {
                noticeImageUrl: true,
                isNoticeActive: true
            }
        });

        if (!settings || !settings.isNoticeActive) {
            return NextResponse.json({
                isNoticeActive: false,
                noticeImageUrl: null
            });
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
