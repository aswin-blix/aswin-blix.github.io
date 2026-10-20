"use client";

// @flow strict
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdAlternateEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import { BiLogoLinkedin } from "react-icons/bi";
import ContactForm from "./contact-form";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
    const containerRef = useRef(null);

    const INFO = [
        { icon: MdAlternateEmail, value: personalData.email, href: `mailto:${personalData.email}` },
        { icon: IoMdCall, value: personalData.phone, href: `tel:${personalData.phone.replace(/\s/g, "")}` },
        { icon: CiLocationOn, value: personalData.address, href: null },
        { icon: BiLogoLinkedin, value: "linkedin.com/in/aswin-blix", href: personalData.linkedIn },
    ];

    useGSAP(
        () => {
            gsap.fromTo(
                ".contact-rise",
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="contact" className="nm-section">
            <SectionHeading title="Contact" />

            <div className="mb-8 max-w-3xl">
                <h2 className="text-2xl font-extrabold tracking-tight text-nm-text sm:text-3xl">
                    Have a store, app, or system that needs a reliable next step?
                </h2>
                <p className="mt-3 text-sm leading-7 text-nm-muted">
                    Share the current situation and the result you want. I can help with a new build,
                    a focused feature, technical cleanup, deployment, or ongoing support.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="contact-rise">
                    <ContactForm />
                </div>

                <div className="contact-rise flex flex-col gap-4">
                    {INFO.map(({ icon: Icon, value, href }, i) => {
                        const card = (
                            <div className="nm-surface flex items-center gap-4 rounded-[18px] p-4 shadow-nm-raised transition-all duration-200 hover:shadow-nm-inset">
                                <span className="nm-surface flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-nm-text shadow-nm-inset">
                                    <Icon size={18} />
                                </span>
                                <span className="break-all text-sm text-nm-muted">{value}</span>
                            </div>
                        );
                        return href ? (
                            <Link
                                key={i}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                            >
                                {card}
                            </Link>
                        ) : (
                            <div key={i}>{card}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
