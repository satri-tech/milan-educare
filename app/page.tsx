import ImageSlider from "@/components/ui/ImageSlider";
import NavBar from "@/components/layouts/NavBar";
import WelcomeText from "@/components/common/WelcomeText";
import SliderImage1 from '@/public/sliderImage1.png'
import SliderImage2 from '@/public/sliderImage2.png'
import SliderImage3 from '@/public/sliderImage3.png'
import MockTest from "@/components/features/MockTest";
import NebNotes from "@/components/features/neb-notes/NebNotes3";
import AboutUs from "@/components/features/AboutUs";
import ContactSection from "@/components/features/ContactUs";
import Footer from "@/components/layouts/Footer";

export default function Home() {
  const swiperImages = [
    SliderImage1, SliderImage2, SliderImage3
  ];
  return (
    <div className=" flex flex-col">
      <NavBar />
      {/* <HeroSection /> */}
      <WelcomeText />
      <ImageSlider swiperImages={swiperImages} imageClass={"object-cover w-full h-[35rem]"}
      />
      <AboutUs />
      <MockTest />
      <NebNotes />
      <ContactSection />
      <Footer />
    </div>
  );
}
