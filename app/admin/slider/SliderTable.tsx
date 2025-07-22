"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "axios";
import { ArrowDown, ArrowUp, Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { ISliderImage } from "./types";
import { Dispatch, SetStateAction, useState } from "react";

interface ISliderTableProps {
    sliderImages: ISliderImage[]
    setSliderImages: Dispatch<SetStateAction<ISliderImage[]>>
}

export default function SliderTable({ sliderImages, setSliderImages }: ISliderTableProps) {
    const [editingImage, setEditingImage] = useState<ISliderImage | null>(null)
    const [editAltText, setEditAltText] = useState("")
    const [editOrder, setEditOrder] = useState("")
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const handleDeleteImage = async (id: string) => {
        try {
            const response = await axios.delete('/api/admin/slider', {
                data: { id }
            });

            if (response.status === 200) {
                setSliderImages((prev) => prev.filter((image) => image.id !== id))
                toast.success("Slider image deleted successfully")
            }
        } catch (error) {
            console.error("Error deleting slider image:", error)
            toast.error("Failed to delete slider image. Please try again.")
        }
    }

    const handleEditImage = (image: ISliderImage) => {
        setEditingImage(image)
        setEditAltText(image.altText || "")
        setEditOrder(image.order.toString())
        setIsEditDialogOpen(true)
    }

    const handleUpdateImage = async () => {
        if (!editingImage) return

        setIsUpdating(true)
        try {
            const response = await axios.put(`/api/admin/slider/${editingImage.id}`, {
                altText: editAltText,
                order: parseInt(editOrder)
            });

            if (response.status === 200) {
                const updatedImage = response.data.sliderImage
                setSliderImages((prev) =>
                    prev.map((image) =>
                        image.id === editingImage.id ? updatedImage : image
                    ).sort((a, b) => a.order - b.order)
                )
                setIsEditDialogOpen(false)
                toast.success("Slider image updated successfully")
            }
        } catch (error) {
            console.error("Error updating slider image:", error)
            toast.error("Failed to update slider image. Please try again.")
        } finally {
            setIsUpdating(false)
        }
    }

    const moveImage = async (imageId: string, direction: 'up' | 'down') => {
        const currentIndex = sliderImages.findIndex(img => img.id === imageId)
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === sliderImages.length - 1)
        ) {
            return
        }

        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
        const currentImage = sliderImages[currentIndex]
        const targetImage = sliderImages[targetIndex]

        try {
            // Update both images' orders
            await Promise.all([
                axios.put(`/api/admin/slider/${currentImage.id}`, {
                    order: targetImage.order
                }),
                axios.put(`/api/admin/slider/${targetImage.id}`, {
                    order: currentImage.order
                })
            ])

            // Update local state
            const newImages = [...sliderImages]
            newImages[currentIndex] = { ...currentImage, order: targetImage.order }
            newImages[targetIndex] = { ...targetImage, order: currentImage.order }
            newImages.sort((a, b) => a.order - b.order)

            setSliderImages(newImages)
            toast.success("Image order updated successfully")
        } catch (error) {
            console.error("Error updating image order:", error)
            toast.error("Failed to update image order")
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Preview</TableHead>
                            <TableHead>File Name</TableHead>
                            <TableHead>Alt Text</TableHead>
                            <TableHead>Order</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sliderImages.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8">
                                    No slider images found
                                </TableCell>
                            </TableRow>
                        ) : (
                            sliderImages.map((image, index) => (
                                <TableRow key={image.id}>
                                    <TableCell>
                                        <Image
                                            height={60}
                                            width={100}
                                            src={`/api/admin/slider/${image.url}`}
                                            alt={image.altText || image.name}
                                            className="h-15 w-25 object-cover rounded border"
                                            onError={(e) => {
                                                // Fallback to a default image if loading fails
                                                console.error(`Failed to load thumbnail: ${image.url}`);
                                                e.currentTarget.src = '/placeholder.svg';
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <span>{image.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="max-w-xs">
                                            {image.altText ? (
                                                <span className="text-sm">{image.altText.length > 50 ? image.altText.substring(0, 50) + "..." : image.altText}</span>
                                            ) : (
                                                <span className="text-muted-foreground text-sm italic">No alt text</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{image.order}</Badge>
                                    </TableCell>
                                    <TableCell className="text-sm text-muted-foreground">
                                        {formatDate(image.createdAt)}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {/* Move Up/Down Buttons */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => moveImage(image.id, 'up')}
                                                disabled={index === 0}
                                                title="Move up"
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => moveImage(image.id, 'down')}
                                                disabled={index === sliderImages.length - 1}
                                                title="Move down"
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>

                                            {/* View Full Image Button */}
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="icon" variant="ghost" title="View full image">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-4xl">
                                                    <DialogHeader>
                                                        <DialogTitle>{image.name}</DialogTitle>
                                                        <DialogDescription>
                                                            {image.altText && <span>Alt text: {image.altText}</span>}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex justify-center">
                                                        <Image
                                                            src={`/api/admin/slider/${image.url}`}
                                                            alt={image.altText || image.name}
                                                            width={800}
                                                            height={400}
                                                            className="max-w-full h-auto rounded-lg"
                                                            onError={(e) => {
                                                                console.error(`Failed to load full image: ${image.url}`);
                                                                e.currentTarget.src = '/placeholder.svg';
                                                            }}
                                                        />
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            {/* Edit Button */}
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => handleEditImage(image)}
                                                title="Edit"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </Button>

                                            {/* Delete Button */}
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button size="icon" variant="ghost" className="text-red-600 hover:text-red-700" title="Delete">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Delete Slider Image</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            {` Are you sure you want to delete "${image.name}"? This action cannot be undone.`}
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteImage(image.id)}
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

            {/* Edit Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Slider Image</DialogTitle>
                        <DialogDescription>
                            Update the alt text and display order for this slider image.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="edit-alt-text">Alt Text</Label>
                            <Textarea
                                id="edit-alt-text"
                                value={editAltText}
                                onChange={(e) => setEditAltText(e.target.value)}
                                placeholder="Describe the image..."
                                className="resize-none"
                            />
                        </div>
                        <div>
                            <Label htmlFor="edit-order">Display Order</Label>
                            <Input
                                id="edit-order"
                                type="number"
                                value={editOrder}
                                onChange={(e) => setEditOrder(e.target.value)}
                                min="1"
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button
                                variant="outline"
                                onClick={() => setIsEditDialogOpen(false)}
                                disabled={isUpdating}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleUpdateImage}
                                disabled={isUpdating}
                            >
                                {isUpdating ? "Updating..." : "Update"}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}
