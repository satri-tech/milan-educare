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
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Upload, X } from "lucide-react"
import { Dispatch, SetStateAction, useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import axios from "axios"
import { ISliderImage } from "./types"

const formSchema = z.object({
    altText: z.string().optional(),
    order: z.string().optional(),
    sliderImage: z.any()
})

interface IAddSliderImageProps {
    setSliderImages: Dispatch<SetStateAction<ISliderImage[]>>
    setIsOpen: Dispatch<SetStateAction<boolean>>
}

export default function AddSliderImage({ setSliderImages, setIsOpen }: IAddSliderImageProps) {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            altText: "",
            order: "",
            sliderImage: null
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

            // Validate file size (10MB limit)
            if (file.size > 10 * 1024 * 1024) {
                toast.error('File size must be less than 10MB')
                return
            }

            setSelectedImage(file)
            form.setValue('sliderImage', file)

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
        form.setValue('sliderImage', null)
    }

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!selectedImage) {
            toast.error("Please select an image to upload")
            return
        }

        setIsLoading(true)

        try {
            // Create form data for file upload
            const formData = new FormData()
            formData.append('image', selectedImage)
            if (values.altText) {
                formData.append('altText', values.altText)
            }
            if (values.order) {
                formData.append('order', values.order)
            }

            const response = await axios.post('/api/admin/slider/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                const newSliderImage = response.data.sliderImage
                setSliderImages((prev) => [newSliderImage, ...prev])
                setIsOpen(false)
                toast.success("Slider image uploaded successfully!")
            }

            // Reset form
            form.reset()
            setSelectedImage(null)
            setImagePreview(null)

        } catch (error) {
            console.error('Error uploading slider image:', error)
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.error || "Failed to upload slider image")
            } else {
                toast.error("Failed to upload slider image")
            }
        } finally {
            setIsLoading(false)
        }
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
                control={form.control}
                name="sliderImage"
                render={() => (
                    <FormItem>
                        <FormLabel>Slider Image *</FormLabel>
                        <FormControl>
                            <div className="space-y-3">
                                {/* Upload Button */}
                                <div className="flex items-center gap-2">
                                    <Label
                                        htmlFor="slider-image-input"
                                        className="flex items-center gap-2 px-4 py-3 w-full bg-card rounded-lg cursor-pointer transition-colors border hover:bg-accent"
                                    >
                                        {selectedImage ? <ImageIcon size={16} /> : <Upload size={16} />}
                                        {selectedImage ? 'Change Image' : 'Upload Image'}
                                    </Label>
                                    <input
                                        id="slider-image-input"
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
                                            alt="Slider preview"
                                            height={200}
                                            width={300}
                                            className="rounded-lg object-cover"
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
                                        {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                                    </p>
                                )}
                            </div>
                        </FormControl>
                        <FormDescription>
                            Upload an image for the slider. Max size: 10MB. Recommended size: 1920x600px
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="altText"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Alt Text</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Describe the image for accessibility..."
                                className="resize-none"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            Optional description for accessibility and SEO
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Display Order</FormLabel>
                        <FormControl>
                            <Input 
                                type="number" 
                                placeholder="1, 2, 3..." 
                                min="1"
                                {...field} 
                            />
                        </FormControl>
                        <FormDescription>
                            Order in which the image appears in the slider (leave empty for auto-increment)
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                    <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Uploading...
                    </div>
                ) : (
                    "Upload Slider Image"
                )}
            </Button>
        </form>
    </Form>
}
