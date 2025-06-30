import ImageSlider from "./(client)/slider/ImageSlider";
import NavBar from "./(client)/navbar/NavBar";
import WelcomeText from "./components/WelcomeText";
import SliderImage1 from '@/public/sliderImage1.png'
import SliderImage2 from '@/public/sliderImage2.png'
import SliderImage3 from '@/public/sliderImage3.png'
import MockTest from "./(client)/mock-test/MockTest";
import NebNotes from "./(client)/neb-notes/NebNotes1";

export default function Home() {
  const swiperImages = [
    SliderImage1, SliderImage2, SliderImage3
  ];
  return (
    <div className=" h-screen flex flex-col gap-10">
      <NavBar />
      <WelcomeText />
      <div className="bg-gray-600  h-[32rem]">
        <ImageSlider swiperImages={swiperImages} imageClass={"object-cover w-full h-[32rem]"}
        />
      </div>
      <MockTest />
      <NebNotes />
    </div>
  );
}
