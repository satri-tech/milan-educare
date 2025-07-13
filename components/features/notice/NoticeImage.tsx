// components/features/NoticeImage.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import LoadingSpinner from './LoadingSpinner';

interface NoticeImageProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const NoticeImage: React.FC<NoticeImageProps> = ({ src, alt, onClose }) => {
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    return (
        <div className="relative rounded-lg shadow-xl overflow-hidden">
            {/* Close Button */}

            {!imageLoading && <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="
          absolute top-3 right-3
          h-8 w-8 
          sm:h-10 sm:w-10  
          bg-white/90 
          hover:bg-white 
          rounded-full 
          shadow-lg
          z-50
          transition-all
          duration-200
        "
            >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
                <span className="sr-only">Close notice</span>
            </Button>
            }


            {/* Loading State */}
            {imageLoading && (
                <div className="min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center ">
                    <LoadingSpinner />
                </div>
            )}

            {/* Error State */}
            {imageError && !imageLoading && (
                <div className="min-h-[200px] sm:min-h-[300px] lg:min-h-[400px] flex items-center justify-center">
                    <div className="text-center p-8">
                        <div className="text-gray-400 mb-2">
                            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-gray-500">Failed to load notice image</p>
                    </div>
                </div>
            )}

            {/* Notice Image */}
            <Image
                src={`${src}?v=${Date.now()}`}
                alt={alt}
                className={`w-full h-auto object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0 absolute' : 'opacity-100'
                    }`}
                loading="eager"
                priority
                quality={100}
                width={1600}
                height={800}
                onLoad={handleImageLoad}
                onError={handleImageError}
            />
        </div>
    );
};

export default NoticeImage;