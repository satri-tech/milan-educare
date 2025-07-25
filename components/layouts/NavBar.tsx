'use client'
import { HiOutlineMenuAlt4, HiX } from "react-icons/hi";
import LogoImage from '@/public/logo.png'
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";

export default function NavBar() {
    const [activeSection, setActiveSection] = useState("home");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const links = useMemo(() => [
        { title: "Home", id: "home" },
        { title: "About Us", id: "about" },
        { title: "Mock Test", id: "mocks" },
        { title: "NEB Notes", id: "notes" },
        { title: "Contact Us", id: "contact" },
    ], []);

    // Track scroll position for navbar background transition
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);

            // Track active section on scroll
            const sections = links.map(link => document.getElementById(link.id));
            const scrollPos = scrollPosition + 100; // Offset for navbar height

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

    // Close mobile menu when clicking outside or on scroll
    useEffect(() => {
        const handleClickOutside = () => {
            setIsMobileMenuOpen(false);
        };

        const handleScroll = () => {
            setIsMobileMenuOpen(false);
        };

        if (isMobileMenuOpen) {
            document.addEventListener('click', handleClickOutside);
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isMobileMenuOpen]);

    const handleMenuClick = (id: string) => {
        // Close mobile menu when a link is clicked
        setIsMobileMenuOpen(false);

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

    const toggleMobileMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className={`py-1 flex w-full justify-center font-Poppins sticky top-0 z-50 transition-all duration-300 ease-in-out ${isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white'
            }`}>
            <div className="w-[92%] flex justify-between items-center">
                {/* Logo with hover effect */}
                <div className="font-semibold text-2xl cursor-pointer font-Varela transform transition-all duration-200 hover:scale-105"
                    onClick={() => handleMenuClick("home")}>
                    <Image
                        src={LogoImage}
                        alt="logo"
                        height={1000}
                        width={100}
                        className="h-16 w-16 transition-transform duration-200 hover:rotate-3"
                    />
                </div>

                {/* Desktop Navigation with enhanced transitions */}
                <div className="hidden lg:flex gap-12 text-sm font-medium items-center">
                    {links.map((data, index) => (
                        <div
                            className={`cursor-pointer relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-0.5 ${activeSection === data.id
                                ? 'text-green-600 font-semibold'
                                : 'hover:text-green-600 text-gray-700'
                                }`}
                            key={data.id}
                            onClick={() => handleMenuClick(data.id)}
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            {data.title}
                            {/* Animated underline */}
                            <div className={`absolute -bottom-1 left-0 h-0.5 bg-green-600 transition-all duration-300 ease-in-out ${activeSection === data.id ? 'w-full' : 'w-0 group-hover:w-full'
                                }`}></div>
                            {/* Hover background effect */}
                            <div className="absolute inset-0 bg-green-50 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200 -z-10 transform scale-110"></div>
                        </div>
                    ))}
                </div>

                {/* Mobile Navigation Toggle with smooth rotation */}
                <div className="lg:hidden relative">
                    <div
                        className="text-2xl cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-green-600"
                        onClick={toggleMobileMenu}
                    >
                        <div className={`transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : 'rotate-0'}`}>
                            {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt4 />}
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu with slide-in animation */}
                    <div
                        className={`absolute top-full right-0 mt-2 bg-white/95 backdrop-blur-md shadow-xl border border-gray-200 rounded-xl min-w-[200px] py-2 z-50 transition-all duration-300 ease-in-out transform origin-top-right ${isMobileMenuOpen
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                            }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {links.map((data, index) => (
                            <div
                                key={data.id}
                                className={`px-4 py-3 cursor-pointer transition-all duration-200 ease-in-out border-b border-gray-100 last:border-b-0 transform hover:scale-105 hover:translate-x-1 ${activeSection === data.id
                                    ? 'text-green-600 font-semibold bg-green-50 border-l-4 border-l-green-600'
                                    : 'hover:text-green-600 hover:bg-gray-50'
                                    }`}
                                onClick={() => handleMenuClick(data.id)}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                    transition: `all 200ms ease-in-out ${index * 50}ms`
                                }}
                            >
                                {data.title}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}