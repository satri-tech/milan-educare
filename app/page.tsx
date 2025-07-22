'use client';

import { useState, useEffect } from 'react';
import ImageSlider from "@/components/ui/ImageSlider";
import NavBar from "@/components/layouts/NavBar";
import WelcomeText from "@/components/common/WelcomeText";
import MockTest from "@/components/features/MockTest";
import NebNotes from "@/components/features/neb-notes/NebNotes1";
import ContactSection from "@/components/features/ContactUs";
import Footer from "@/components/layouts/Footer";
import NoticeDialog from '@/components/features/notice/NoticeDialog';
import axios from 'axios';
import Testimonials from '@/components/features/testimonials/Testimonials';
import AboutUs from '@/components/features/AboutUs';
import { toast } from 'sonner';
import { ISliderImage } from './admin/slider/types';

// TypeScript interface for notice data
interface NoticeData {
  noticeImageUrl: string;
  isNoticeActive: boolean;
}
export default function Home() {
  const [showNotice, setShowNotice] = useState<boolean>(false);
  const [noticeData, setNoticeData] = useState<NoticeData | null>(null);


  const [sliderImages, setSliderImages] = useState<ISliderImage[]>([])  
  const [isSliderLoading, setIsSliderLoading] = useState(true)

  const handleFetchSliderImages = async () => {
    try {
      setIsSliderLoading(true)
      const response = await axios.get('/api/admin/slider')
      const data = response.data;
      console.log(data)
      setSliderImages(data);
    } catch (error) {
      console.error('Error fetching slider images:', error)
      toast.error("Failed to fetch slider images")
    } finally {
      setIsSliderLoading(false)
    }
  }

  useEffect(() => {
    handleFetchSliderImages()
  }, [])


  useEffect(() => {
    window.scrollTo(0, 0); // Ensures scroll starts from top

    const fetchNotice = async (): Promise<void> => {
      try {
        const response = await axios.get('/api/notice');

        const data = response.data;

        // Only set notice data and show dialog if there's an image and it's active
        if (data.isNoticeActive && data.noticeImageUrl) {
          setNoticeData(data);
          setShowNotice(true);
        }
      } catch (error) {
        console.error('Error fetching notice:', error);
        // Optionally, you can set an error state here
      }
    };

    fetchNotice();
  }, []);

  const handleCloseNotice = (): void => {
    setShowNotice(false);
  };

  return (
    <div className="flex flex-col ">
      <NavBar />

      {/* Notice Dialog - only render if we have notice data */}
      {noticeData && (
        <NoticeDialog
          isOpen={showNotice}
          onClose={handleCloseNotice}
          noticeData={noticeData}
        />
      )}

      <WelcomeText />
      {!isSliderLoading && sliderImages.length > 0 && (
        <ImageSlider
          swiperImages={sliderImages}
          imageClass="object-cover w-full h-[35rem]"
        />
      )}
      {isSliderLoading && (
        <div className="h-[35rem] w-full bg-gray-300 animate-pulse flex items-center justify-center">
        </div>
      )}
      <AboutUs />
      <MockTest />
      <NebNotes />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}