import ImageSlider from "./components/ImageSlider";
import NavBar from "./components/NavBar";
import WelcomeText from "./components/WelcomeText";

export default function Home() {
  return (
    <div className=" h-screen">
      <NavBar />
      <WelcomeText />
      <ImageSlider />
    </div>
  );
}
