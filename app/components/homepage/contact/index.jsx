"use client";

// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from "./contact-form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(".contact-form", {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            }).from(
                ".contact-info",
                {
                    x: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                "-=0.8"
            );
        },
        { scope: containerRef }
    );

    return (
        <div ref={containerRef} id="contact" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b] text-white">
            <div className="flex justify-center -translate-y-[1px]">
                <div className="w-3/4">
                    <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
                </div>
            </div>
            <div className="flex justify-center my-5 lg:py-8">
                <div className="flex items-center">
                    <span className="w-24 h-[2px] bg-[#1a1443]"></span>
                    <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
                        Contact
                    </span>
                    <span className="w-24 h-[2px] bg-[#1a1443]"></span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                <div className="contact-form">
                    <ContactForm />
                </div>

                <div className="contact-info lg:w-3/4">
                    <div className="flex flex-col gap-6">
                        <p className="text-sm md:text-xl flex items-center gap-3">
                            <MdAlternateEmail
                                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={36}
                            />
                            <span>{personalData.email}</span>
                        </p>
                        <p className="text-sm md:text-xl flex items-center gap-3">
                            <IoMdCall
                                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={36}
                            />
                            <span>{personalData.phone}</span>
                        </p>
                        <p className="text-sm md:text-xl flex items-center gap-3">
                            <CiLocationOn
                                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={36}
                            />
                            <span>{personalData.address}</span>
                        </p>
                    </div>
                    <div className="mt-8 lg:mt-16 flex items-center gap-5">
                        <Link target="_blank" href={personalData.github}>
                            <IoLogoGithub
                                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={48}
                            />
                        </Link>
                        <Link target="_blank" href={personalData.linkedIn}>
                            <BiLogoLinkedin
                                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={48}
                            />
                        </Link>
                        <Link target="_blank" href={personalData.twitter}>
                            <FaXTwitter
                                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={48}
                            />
                        </Link>
                        <Link target="_blank" href={personalData.stackOverflow}>
                            <FaStackOverflow
                                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={48}
                            />
                        </Link>
                        <Link target="_blank" href={personalData.facebook}>
                            <FaFacebook
                                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                                size={48}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactSection;
