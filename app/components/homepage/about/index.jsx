"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BsGithub, BsLinkedin, BsTwitter, BsFacebook } from "react-icons/bs";
import SectionHeading from "../../helper/section-heading";
import lottieAbout from "/public/lottie/coding.json";

const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
    { href: personalData.github, icon: BsGithub, label: "GitHub" },
    { href: personalData.linkedIn, icon: BsLinkedin, label: "LinkedIn" },
    { href: personalData.twitter, icon: BsTwitter, label: "Twitter" },
    { href: personalData.facebook, icon: BsFacebook, label: "Facebook" },
];

function AboutSection() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".about-rise",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="about" className="nm-section">
            <SectionHeading title="Who I Am" />

            <div className="nm-surface relative overflow-hidden rounded-[28px] p-6 shadow-nm-raised-lg sm:p-8 lg:p-10">
                {/* Decorative grayscale lottie, top-right */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-6 -top-6 hidden w-40 opacity-20 grayscale lg:block xl:w-52"
                >
                    <AnimationLottie animationPath={lottieAbout} />
                </div>

                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[auto_1fr] lg:gap-14">
                    {/* LEFT — photo + socials */}
                    <div className="about-rise flex flex-col items-center gap-6">
                        <div className="nm-surface rounded-full p-3 shadow-nm-raised-lg">
                            <Image
                                src={personalData.profile}
                                width={200}
                                height={200}
                                alt="Aswin Blix T.C — Freelance Shopify and Full-Stack Developer"
                                priority
                                className="h-[180px] w-[180px] rounded-full object-cover grayscale transition-all duration-700 hover:grayscale-0 sm:h-[200px] sm:w-[200px]"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            {SOCIALS.map(({ href, icon: Icon, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    aria-label={label}
                                    className="nm-icon-btn h-10 w-10"
                                >
                                    <Icon size={16} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT — copy */}
                    <div className="about-rise relative z-10">
                        <h3 className="mb-4 text-2xl font-extrabold tracking-tight text-nm-text sm:text-[28px]">
                            Hey! I&apos;m Aswin Blix
                        </h3>
                        <p className="max-w-2xl text-[15px] leading-[1.8] text-nm-muted">
                            {personalData.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
