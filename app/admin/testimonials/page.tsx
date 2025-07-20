'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import AddTestimonials from "./AddTestimonials";
import TestimonalsTable from "./TestimonialsTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { ITestimonial } from "./types";

export default function TestimonialsPage() {
    const [isOpen, setIsOpen] = useState(false)
    const [testimonials, setTestimonials] = useState<ITestimonial[]>([])
    const handleFetchTestimonials = async () => {
        try {
            const response = await axios.get('/api/admin/testimonials')
            const data = response.data;
            setTestimonials(data);
        } catch (error) {
            alert(error)
        }
    }
    useEffect(() => {
        handleFetchTestimonials()

    }, [])
    return <div className="container mx-auto p-6 space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Testimonials Management
                </CardTitle>
                <CardDescription>
                    Manage user testimonials and reviews
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center justify-between">
                    <Badge variant="outline" className="text-sm">
                        Total Testimonials: {testimonials.length}
                    </Badge>
                    <div className="flex items-center gap-2">
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button size="sm">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Testimonial
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Add New Testimonial</DialogTitle>
                                    <DialogDescription>
                                        Create a new testimonial entry
                                    </DialogDescription>
                                </DialogHeader>
                                <AddTestimonials setTestimonials={setTestimonials} setIsOpen={setIsOpen} />
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <TestimonalsTable testimonials={testimonials} setTestimonials={setTestimonials} />
            </CardContent>
        </Card>
    </div>
}