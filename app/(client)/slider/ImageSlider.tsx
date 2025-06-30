'use client'
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation"; // Add this import
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { StaticImageData } from "next/image";

interface IImageSwiper {
    swiperImages: StaticImageData[],
    imageClass: string
}

export default function ImageSwiper({ swiperImages, imageClass }: IImageSwiper) {
    return (
        <div style={{ position: 'relative' }}>
            <Swiper
                modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation={true} // Enable navigation arrows
                pagination={{ clickable: true }}
                loop={true}
            >
                {swiperImages.map((images, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <img src={images.src} alt="" className={imageClass} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};