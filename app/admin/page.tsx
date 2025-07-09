"use client"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function AdminPage() {
    return (
        <div className="w-full min-h-screen bg-background">
            <div className="w-full p-6">
                {/* Footer Info */}
                <div className=" text-center">
                    <Card className="max-w-6xl mx-auto">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-center mb-4">
                                <h3 className="text-xl font-semibold">Dashboard Under Development</h3>
                            </div>
                            <p className="text-muted-foreground mb-4">
                                {`We're building a comprehensive admin dashboard with all the tools you need to manage your educational platform effectively.`}.
                            </p>
                            <div className="flex flex-wrap justify-center gap-2">
                                <Badge variant="outline">Dynamic Image upload for slider</Badge>
                                <Badge variant="outline">Notice Dialog</Badge>
                                <Badge variant="outline">Dynamic About Us</Badge>
                                <Badge variant="outline">Dynamic Contact Us</Badge>
                                <Badge variant="outline">Testimonials</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
