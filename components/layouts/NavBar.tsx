'use client'
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import LogoImage from '@/public/logo.jpg'
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

export default function NavBar() {
    const [activeSection, setActiveSection] = useState("home");

    const links = useMemo(() => [
        { title: "Home", id: "home" },
        { title: "About Us", id: "about" },
        { title: "Mock Test", id: "mocks" },
        { title: "NEB Notes", id: "notes" },
        { title: "Contact Us", id: "contact" },
    ], []);

    // Track active section on scroll
    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.getElementById(link.id));
            const scrollPos = window.scrollY + 100; // Offset for navbar height

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveSection(links[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [links]);

    const handleMenuClick = (id: string) => {
        // Check if we're not on the home page using window.location
        if (typeof window !== 'undefined' && window.location.pathname !== "/") {
            // Navigate to home page first
            window.location.href = "/";
            // The scroll will happen after page load via URL hash or localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('scrollToSection', id);
            }
        } else {
            // We're already on the home page, just scroll
            scrollToSection(id);
        }
    };

    // Check for pending scroll on component mount
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const pendingScroll = localStorage.getItem('scrollToSection');
            if (pendingScroll) {
                localStorage.removeItem('scrollToSection');
                setTimeout(() => {
                    scrollToSection(pendingScroll);
                }, 100);
            }
        }
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const navbarHeight = 80; // Adjust based on your navbar height
            const elementPosition = element.offsetTop - navbarHeight;

            window.scrollTo({
                top: elementPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <div className="py-6 flex w-full justify-center font-Poppins sticky top-0 bg-white z-50 ">
            <div className="w-[92%] flex justify-between items-center">
                <div className="font-semibold text-2xl cursor-pointer font-Varela"
                    onClick={() => handleMenuClick("home")}>
                    <Image
                        src={LogoImage}
                        alt="logo"
                        height={100}
                        width={100}
                        className="h-10 w-10"
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex gap-12 text-sm font-medium items-center">
                    {links.map((data) => (
                        <div
                            className={`cursor-pointer transition-colors duration-200 ${activeSection === data.id
                                ? 'text-green-600 font-semibold'
                                : 'hover:text-green-600'
                                }`}
                            key={data.id}
                            onClick={() => handleMenuClick(data.id)}
                        >
                            {data.title}
                        </div>
                    ))}
                    <div className="text-2xl cursor-pointer hover:text-blue-600 transition-colors duration-200 block lg:hidden">
                        <HiOutlineMenuAlt4 />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="text-2xl cursor-pointer hover:text-blue-600 transition-colors duration-200 lg:hidden">
                    <HiOutlineMenuAlt4 />
                </div>
            </div>
        </div>
    );
}