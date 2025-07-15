"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Upload, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios from "axios"

const formSchema = z.object({
    fullname: z.string().min(5).max(50),
    role: z.string().min(4).max(15),
    content: z.string().min(4).max(50),
    ratings: z
        .string({
            required_error: "Please select an email to display.",
        }),
    userImage: z.any()
})

export default function AddTestimonials() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            role: "",
            content: "",
            ratings: "",
            userImage: null

        },
    })
    // Handle file selection
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file')
                return
            }

            // Validate file size (5MB limit)
            if (file.size > 5 * 1024 * 1024) {
                toast.error('File size must be less than 5MB')
                return
            }

            setSelectedImage(file)
            form.setValue('userImage', file)

            // Create preview
            const reader = new FileReader()
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const result = e.target?.result
                if (typeof result === 'string') {
                    setImagePreview(result)
                }
            }
            reader.readAsDataURL(file)
        }
    }


    // Remove selected image
    const removeImage = () => {
        setSelectedImage(null)
        setImagePreview(null)
        form.setValue('userImage', null)
    }


    // Upload image function
    const uploadImage = async (file: File): Promise<string> => {
        const formData = new FormData()
        formData.append('image', file)

        const response = await axios.post('/api/admin/testimonials/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })

        return response.data.url
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)

        try {
            let imageUrl = "/placeholder.svg?height=40&width=40"

            // Upload image if selected
            if (selectedImage) {
                imageUrl = await uploadImage(selectedImage)
            }

            // Create testimonial
            const testimonialData = {
                name: values.fullname,
                role: values.role,
                content: values.content,
                rating: parseInt(values.ratings),
                image: imageUrl
            }

            await axios.post('/api/admin/testimonials', testimonialData)
            toast.success("Testimonial created successfully!")

            // Reset form
            form.reset()
            setSelectedImage(null)
            setImagePreview(null)

        } catch (error) {
            console.error('Error creating testimonial:', error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Failed to create testimonial")
            } else {
                toast.error("Failed to create testimonial")
            }
        } finally {
            setIsLoading(false)
        }
    }
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                            <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Content</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Tell us a little bit about yourself"
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="ratings"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select rating" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="1">1 Star</SelectItem>
                                <SelectItem value="2">2 Stars</SelectItem>
                                <SelectItem value="3">3 Stars</SelectItem>
                                <SelectItem value="4">4 Stars</SelectItem>
                                <SelectItem value="5">5 Stars</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="userImage"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Profile Image</FormLabel>
                        <FormControl>
                            <div className="space-y-3">

                                {/* Upload Button */}
                                <div className="flex items-center gap-2">
                                    <Label
                                        htmlFor="profile-image-input"
                                        className="flex items-center gap-2 px-4 py-3 w-full   bg-card rounded-lg cursor-pointer  transition-colors border "
                                    >
                                        {selectedImage ? <ImageIcon size={16} /> : <Upload size={16} />}
                                        {selectedImage ? 'Change Image' : 'Upload Image'}
                                    </Label>
                                    <input
                                        id="profile-image-input"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                </div>
                                {/* Image Preview */}
                                {imagePreview && (
                                    <div className="relative inline-block">
                                        <Image
                                            src={imagePreview}
                                            alt="Profile preview"
                                            height={100}
                                            width={100}
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                )}


                                {selectedImage && (
                                    <p className="text-sm text-gray-600">
                                        {selectedImage.name} ({(selectedImage.size / 1024).toFixed(1)} KB)
                                    </p>
                                )}
                            </div>
                        </FormControl>
                        <FormDescription>
                            Upload a profile image (optional). Max size: 5MB
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />


            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                    </div>
                ) : (
                    "Submit"
                )}
            </Button>
        </form>
    </Form>
}