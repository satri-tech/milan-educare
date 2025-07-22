'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Images, Plus } from "lucide-react";
import AddSliderImage from "./AddSliderImage";
import SliderTable from "./SliderTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { ISliderImage } from "./types";
import { toast } from "sonner";

export default function ImageSlider() {
    const [isOpen, setIsOpen] = useState(false)
    const [sliderImages, setSliderImages] = useState<ISliderImage[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const handleFetchSliderImages = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get('/api/admin/slider')
            const data = response.data;
            console.log(data)
            setSliderImages(data);
        } catch (error) {
            console.error('Error fetching slider images:', error)
            toast.error("Failed to fetch slider images")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        handleFetchSliderImages()
    }, [])

    return (
        <div className=" w-full p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Images className="h-6 w-6" />
                        Image Slider Management
                    </CardTitle>
                    <CardDescription>
                        Manage images that appear in the homepage slider carousel
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Badge variant="outline" className="text-sm">
                                Total Images: {sliderImages.length}
                            </Badge>
                            {sliderImages.length > 0 && (
                                <Badge variant="secondary" className="text-sm">
                                    Active Slides: {sliderImages.length}
                                </Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button size="sm">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Slider Image
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                    <DialogHeader>
                                        <DialogTitle>Add New Slider Image</DialogTitle>
                                        <DialogDescription>
                                            Upload a new image to be displayed in the homepage slider
                                        </DialogDescription>
                                    </DialogHeader>
                                    <AddSliderImage setSliderImages={setSliderImages} setIsOpen={setIsOpen} />
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            <span className="ml-2">Loading slider images...</span>
                        </div>
                    ) : (
                        <SliderTable sliderImages={sliderImages} setSliderImages={setSliderImages} />
                    )}
                </CardContent>
            </Card>

            {/* Usage Instructions */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Usage Instructions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h4 className="font-semibold mb-2">Image Guidelines:</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• Recommended size: 1920x600px</li>
                                <li>• Maximum file size: 10MB</li>
                                <li>• Supported formats: JPEG, PNG, WebP</li>
                                <li>• Use high-quality images for best results</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2">Management Features:</h4>
                            <ul className="space-y-1 text-muted-foreground">
                                <li>• Drag to reorder slides (up/down arrows)</li>
                                <li>• Add alt text for accessibility</li>
                                <li>• Preview images before publishing</li>
                                <li>• Edit order and alt text anytime</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
