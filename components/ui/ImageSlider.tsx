'use client'
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import { ISliderImage } from "@/app/admin/slider/types";

interface IImageSwiper {
    swiperImages: ISliderImage[],
    imageClass: string
}

export default function ImageSwiper({ swiperImages, imageClass }: IImageSwiper) {
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
    const [, setImagesLoaded] = useState(false);
    const [, setLoadedImagesCount] = useState(0);

    // Track image loading
    useEffect(() => {
        if (swiperImages.length > 0) {
            setLoadedImagesCount(0);
            setImagesLoaded(false);
        }
    }, [swiperImages]);

    // Handle image load completion
    const handleImageLoad = () => {
        setLoadedImagesCount(prev => {
            const newCount = prev + 1;
            if (newCount === swiperImages.length) {
                setImagesLoaded(true);
                // Re-initialize swiper after all images are loaded
                if (swiperInstance) {
                    setTimeout(() => {
                        swiperInstance.update();
                        if (swiperInstance.autoplay) {
                            swiperInstance.autoplay.start();
                        }
                    }, 100);
                }
            }
            return newCount;
        });
    };

    // Don't render Swiper if no images
    if (!swiperImages || swiperImages.length === 0) {
        return (
            <div className="h-[35rem] w-full bg-gray-300 animate-pulse flex items-center justify-center">
                <div className="text-gray-600">No slider images available</div>
            </div>
        );
    }

    return (
        <div style={{ position: 'relative' }}>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                loop={swiperImages.length > 1}
                onSwiper={setSwiperInstance}
                allowTouchMove={true}
                grabCursor={true}
            >
                {swiperImages.map((image, index) => {
                    return (
                        <SwiperSlide key={`${image.id}-${index}`}>
                            <Image
                                src={`/api/admin/slider/${image.url}`}
                                alt={image.altText || `Slider image ${index + 1}`}
                                width={2000}
                                height={600}
                                className={`w-full object-cover ${imageClass}`}
                                onLoad={handleImageLoad}
                                onError={(e) => {
                                    console.error(`Failed to load image: ${image.url}`);
                                    // Set a fallback image or handle error
                                    e.currentTarget.src = '/placeholder.svg';
                                    handleImageLoad(); // Still count as "loaded" to prevent hanging
                                }}
                                priority={index === 0} // Priority load for first image
                            />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
