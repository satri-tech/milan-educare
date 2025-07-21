"use client"
import DashboardStats from "@/components/admin/DashboardStats"

export default function AdminPage() {
    return (
        <div className="w-full min-h-screen bg-background">
            <div className="w-full p-6">
                <DashboardStats />
            </div>
        </div>
    )
}
