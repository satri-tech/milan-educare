import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import axios from "axios";
import { Star, Trash2, User } from "lucide-react";
import Image from "next/image";
import { ITestimonial } from "./types";
import { Dispatch, SetStateAction } from "react";

interface ITestimonialsProps {
    testimonials: ITestimonial[]
    setTestimonials: Dispatch<SetStateAction<ITestimonial[]>>
}

export default function TestimonalsTable({ testimonials, setTestimonials }: ITestimonialsProps) {
    console.log(testimonials)


    const truncateContent = (content: string, maxLength: number = 100) => {
        return content.length > maxLength ? content.substring(0, maxLength) + "..." : content
    }
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
            />
        ))
    }

    const handleDeleteTestimonial = async (id: string) => {
        try {
            const response = await axios.delete(`/api/admin/testimonials/${id}`);
            console.log(response)
            if (response.status === 200) {
                setTestimonials((prev) => prev.filter((testimonial) => testimonial.id !== id))
                toast.success("Testimonial deleted successfully")
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error)
            toast.error("Failed to delete testimonial. Please try again.")
        }
    }
    return <div className="rounded-md border">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {testimonials.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                            No testimonials found
                        </TableCell>
                    </TableRow>
                ) : (
                    testimonials.map((testimonial) => (
                        <TableRow key={testimonial.id}>
                            <TableCell>
                                <Image
                                    height="100"
                                    width="60"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="h-12 w-12 object-cover rounded-full border"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "/placeholder.svg?height=40&width=40";
                                    }}
                                />
                            </TableCell>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    {testimonial.name}
                                </div>
                            </TableCell>
                            <TableCell>{testimonial.role}</TableCell>
                            <TableCell>
                                <div className="max-w-xs">
                                    {truncateContent(testimonial.content, 20)}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1">
                                    {renderStars(testimonial.rating)}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {testimonial.rating}/5
                                    </span>
                                </div>
                            </TableCell>

                            <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                    {/* <Button
                                        variant="outline"
                                        size="sm"
                                    >
                                        <Edit className="h-4 w-4" />
                                    </Button> */}
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button size="icon" className="bg-red-700 hover:bg-red-800">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Delete Testimonial</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Are you sure you want to delete this testimonial from {testimonial.name}? This action cannot be undone.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction
                                                    onClick={() => handleDeleteTestimonial(testimonial.id)}
                                                    className="bg-red-600 hover:bg-red-700"
                                                >
                                                    Delete
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    </div>
}