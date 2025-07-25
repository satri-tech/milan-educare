import Image from "next/image";
import React from "react";
import LogoImage from '@/public/logo.png'
export default function Footer() {
    // const links = [
    //     { title: "Home", id: "home" },
    //     { title: "Mock Test", id: "mocks" },
    //     { title: "NEB Notes", id: "notes" },
    //     { title: "About Us", id: "about" },
    //     { title: "Contact Us", id: "contact" },
    // ];

    // const socialmedia = [
    //     {
    //         name: "Facebook",
    //         href: "#",
    //         icon: FaFacebookSquare,
    //     },
    //     {
    //         name: "Instagram",
    //         href: "#",
    //         icon: FaInstagram,
    //     },
    //     {
    //         name: "Linkedin",
    //         href: "#",
    //         icon: FaLinkedin,
    //     },
    //     {
    //         name: "Youtube",
    //         href: "#",
    //         icon: FaYoutube,
    //     },
    // ];

    return (
        <div className="w-full flex flex-col items-center bg-primary text-white sm:pb-5 tracking-wide ">

            <div className="w-11/12 flex flex-col  gap-1 font-Poppins sm:mt-14 mt-10 z-49  ">
                <div className=" h-28 w-full flex">
                    <Image
                        src={LogoImage}
                        alt="logo"
                        height={1000}
                        width={100}
                        className="h-[70px] w-[70px] transition-transform duration-200 hover:rotate-3"
                    />
                    <div className="w-full">
                        <div className="text-3xl font-semibold font-Poppins ">

                            Milaan EduCare
                        </div>
                        <div className="text-secondary-text">
                            Empowering Students, Enriching Futures
                        </div>
                    </div>

                </div>
                {/* 
                <div className="md:flex md:flex-row flex-col  grid grid-cols-2 gap-y-10  w-full  ">
                    <div className="flex flex-col gap-4 w-full  text-xl font-Poppins">
                        {links.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 cursor-pointer hover:underline text-base text-secondary-text hover:text-white"
                                >
                                    {data.title}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-4 w-full  text-xl font-Poppins">
                        {socialmedia.map((data, index) => {
                            return (
                                <a
                                    href={data.href}
                                    target="_blank"
                                    key={index}
                                    className="flex items-center gap-2 cursor-pointer hover:underline"
                                >
                                    <div className="text-base text-secondary-text hover:text-white">
                                        {" "}
                                        {data.name}
                                    </div>
                                </a>
                            );
                        })}
                    </div>
                    <div className="flex flex-col gap-5  w-64 sm:w-full text-xl font-Poppins">
                        <a
                            className="flex items-center gap-2 text-secondary-text hover:text-white "
                            href="mailto:milaan.educarepkr@gmail.com"
                        >
                            <CiMail />
                            <div className="text-sm   ">milaan.educarepkr@gmail.com</div>
                        </a>
                        <a
                            className="flex   items-center gap-2 text-secondary-text hover:text-white"
                            href="tel:9861366033"
                        >
                            <BsTelephone />
                            <div className="text-sm  ">9861366033 </div>
                        </a>
                    </div>
                </div> */}
            </div>
            <div className="w-11/12 flex justify-end text-secondary-text text-sm pt-4   border-t-[0.5px] border-secondary-text">
                © 2025 Milaan EduCare. All rights reserved
            </div>
        </div>
    );
};

