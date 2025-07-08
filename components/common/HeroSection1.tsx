import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import SliderImage1 from '@/public/sliderImage1.png'
import SliderImage2 from '@/public/sliderImage2.png'
import SliderImage3 from '@/public/sliderImage3.png'
import ImageSlider from "@/components/ui/ImageSlider";

export default function HeroSection() {
    const swiperImages = [
        SliderImage1, SliderImage2, SliderImage3
    ];
    return (
        <section className="w-full flex justify-center ">
            <div className="px-4  w-[90%]">
                <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-6">
                            <div
                                className="  bg-background  cursor-pointer dark:hover:border-t-border 
                                hover:bg-muted group  flex w-fit items-center gap-4 rounded-full border p-1 pl-4
                                 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                            >
                                <span className="text-foreground text-xs">
                                    Educational Excellence Since 2020🚀⚡
                                </span>
                                <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                                <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                        <span className="flex size-6">
                                            <ArrowRight className="m-auto size-3 dark:text-white text-black" />
                                        </span>
                                        <span className="flex size-6">
                                            <ArrowRight className="m-auto size-3 dark:text-white text-black" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <h1 className="text-3xl font-bold tracking-wide sm:text-5xl xl:text-6xl/none">
                                Welcome to {" "}
                                <span className="text-primary">Milan EduCare</span>
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl text-justify">
                                For nearly a decade, Milan EduCare has been at the forefront of educational innovation,
                                providing exceptional support services that transform learning experiences and unlock every student's potential.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Button size="lg" className="gap-2">
                                Get Started
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="lg">
                                Explore More
                            </Button>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                All-in-one dashboard
                            </div>
                            <div className="flex items-center gap-1">
                                <CheckCircle className="h-4 w-4 text-primary" />
                                Hassle-free student management
                            </div>
                        </div>
                    </div>
                    <div className=" h-full w-full  ">
                        <ImageSlider swiperImages={swiperImages} imageClass={"object-contain w-full h-96"}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
