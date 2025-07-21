"use client";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Trash2, Upload, Eye, Image as ImageIcon, X, RotateCcw } from "lucide-react";

export default function NoticePage() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isNoticeActive, setIsNoticeActive] = useState(false);
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchNoticeSettings();
    }, []);

    useEffect(() => {
        if (image) {
            const url = URL.createObjectURL(image);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPreview(null);
        }
    }, [image]);

    const fetchNoticeSettings = async () => {
        try {
            const res = await axios.get("/api/admin/notice");
            setIsNoticeActive(res.data.isNoticeActive);
            setCurrentImageUrl(res.data.noticeImageUrl);
        } catch {
            toast.error("Failed to fetch notice settings");
        } finally {
            setLoading(false);
        }
    };

    const handleToggleChange = async (checked: boolean) => {
        try {
            setIsNoticeActive(checked);
            await axios.put("/api/admin/notice", { isNoticeActive: checked });
            toast.success(`Notice ${checked ? "activated" : "deactivated"} successfully`);
        } catch {
            toast.error("Failed to update notice");
            setIsNoticeActive((prev) => !prev);
        }
    };

    const handleImageUpload = async () => {
        if (!image) return toast.error("Please select an image");

        setUploading(true);
        const formData = new FormData();
        formData.append("noticeImage", image);

        try {
            const res = await axios.post("/api/admin/notice/upload", formData);
            toast.success("Image uploaded successfully");
            setCurrentImageUrl(res.data.url);
            setIsNoticeActive(true);
            setImage(null);
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch {
            toast.error("Failed to upload image");
        } finally {
            setUploading(false);
        }
    };

    const handleRemoveImage = async () => {
        try {
            await axios.delete("/api/admin/notice");
            setCurrentImageUrl(null);
            setIsNoticeActive(false);
            toast.success("Notice image removed successfully");
        } catch {
            toast.error("Failed to remove notice image");
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        validateAndSetFile(file);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        validateAndSetFile(file);
    };

    const validateAndSetFile = (file: File | undefined) => {
        if (!file) return;
        if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
        if (file.size > 5 * 1024 * 1024) return toast.error("File size must be less than 5MB");
        setImage(file);
    };

    const clearSelectedImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const formatFileSize = (bytes: number): string => {
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
    };
    const cacheBustedUrl = (url: string | null) =>
        url ? `${url.startsWith('/') ? url : `/${url}`}?t=${Date.now()}` : null;
    if (loading) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-4 w-96 mb-8" />
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-48" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-6 w-24" />
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Notice Management</h1>
                <p className="text-muted-foreground">Manage your notice that appears when the page loads.</p>
            </div>

            <div className="grid gap-6">
                {/* Status Card */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Notice Status
                            <Badge variant={isNoticeActive ? "default" : "secondary"}>
                                {isNoticeActive ? "Active" : "Inactive"}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Switch checked={isNoticeActive} onCheckedChange={handleToggleChange} />
                                <div>
                                    <Label className="text-sm font-medium">
                                        {isNoticeActive ? "Active" : "Inactive"}
                                    </Label>
                                    <p className="text-xs text-muted-foreground">
                                        {isNoticeActive
                                            ? "Notice is visible to users"
                                            : "Notice is hidden from users"}
                                    </p>
                                </div>
                            </div>
                            {currentImageUrl && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            const url = cacheBustedUrl(currentImageUrl);
                                            if (url) window.open(url, "_blank");
                                        }}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview
                                    </Button>
                                    <Button variant="destructive" size="sm" onClick={handleRemoveImage}>
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Current Image */}
                {currentImageUrl && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Current Notice Image</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg p-4">
                                <div className="relative w-full h-[300px] mx-auto">
                                    
                                    <Image
                                        src={`/api/admin/notice/upload/${currentImageUrl}`}
                                        alt={currentImageUrl}
                                        onError={(e) => {
                                            // Fallback to a default image if the API fails
                                            e.currentTarget.src = '/images/default-avatar.png';
                                        }}
                                        fill
                                        className="object-contain rounded-lg shadow-sm"
                                        sizes="(max-width: 768px) 100vw, 700px"
                                    />


                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Upload Area */}
                <Card>
                    <CardHeader>
                        <CardTitle>{currentImageUrl ? "Update Notice Image" : "Upload Notice Image"}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div
                            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${dragActive ? "border-primary bg-primary/5 border-solid" : "border"
                                }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-3 rounded-full">
                                    <ImageIcon className="w-8 h-8 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-lg font-medium text-primary-foreground">
                                        {dragActive ? "Drop image here" : "Drag & drop an image here"}
                                    </p>
                                    <p className="text-sm text mt-1">or click to browse files</p>
                                </div>
                                <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                                    <span>JPG, PNG, GIF</span>
                                    <span>•</span>
                                    <span>Max 5MB</span>
                                </div>
                            </div>
                        </div>

                        {/* Preview */}
                        {image && preview && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium">Selected Image</h3>
                                    <Button variant="outline" size="sm" onClick={clearSelectedImage}>
                                        <X className="w-4 h-4 mr-1" />
                                        Clear
                                    </Button>
                                </div>
                                <div className="border rounded-lg p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 relative w-24 h-24">
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                fill
                                                className="object-cover rounded-lg shadow-sm"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-white truncate">{image.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">{formatFileSize(image.size)}</p>
                                            <p className="text-xs text-gray-500">{image.type}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <Button onClick={handleImageUpload} disabled={uploading} className="flex-1 sm:flex-none">
                                        {uploading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border mr-2" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-4 h-4 mr-2" />
                                                {currentImageUrl ? "Update Image" : "Upload Image"}
                                            </>
                                        )}
                                    </Button>
                                    <Button variant="outline" onClick={clearSelectedImage} disabled={uploading}>
                                        <RotateCcw className="w-4 h-4 mr-2" />
                                        Choose Different
                                    </Button>
                                </div>
                            </div>
                        )}

                        <div className="border rounded-lg p-4">
                            <h4 className="text-sm font-medium text-muted-foreground mb-2">Upload Guidelines</h4>
                            <ul className="text-xs text-neutral-300 space-y-1">
                                <li>• Use high-quality images for best results</li>
                                <li>• Recommended dimensions: 1200x400px for banner-style notices</li>
                                <li>• Ensure text in images is readable on all devices</li>
                                <li>• File size limit: 5MB maximum</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
