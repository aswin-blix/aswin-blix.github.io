"use client";

import { servicesData } from "@/utils/data/services-data";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiBox, FiCloud, FiLayout, FiShoppingBag, FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS = {
    "shopify-themes": FiLayout,
    "shopify-apps": FiBox,
    "headless-commerce": FiShoppingBag,
    "business-cloud": FiCloud,
};

function Services() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".service-card",
                { opacity: 0, y: 36, rotateX: -12, transformPerspective: 800 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.65,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top 80%" },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="services" className="nm-section">
            <SectionHeading title="What You Can Hire Me For" />

            <div className="mb-8 max-w-3xl">
                <h2 className="text-2xl font-extrabold tracking-tight text-nm-text sm:text-3xl">
                    Practical delivery for stores, apps, and the systems behind them.
                </h2>
                <p className="mt-3 text-sm leading-7 text-nm-muted">
                    I can own a complete build, join an existing codebase, rescue a difficult feature,
                    or provide ongoing development and production support.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {servicesData.map((service) => {
                    const Icon = SERVICE_ICONS[service.id];

                    return (
                        <article
                            key={service.id}
                            className="service-card nm-surface flex h-full flex-col rounded-[24px] p-6 shadow-nm-raised sm:p-7"
                        >
                            <div className="nm-surface flex h-11 w-11 items-center justify-center rounded-2xl text-nm-text shadow-nm-inset">
                                <Icon size={20} />
                            </div>
                            <h3 className="mt-5 text-lg font-extrabold text-nm-text">
                                {service.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-nm-muted">{service.summary}</p>

                            <ul className="mt-5 space-y-3">
                                {service.deliverables.map((deliverable) => (
                                    <li
                                        key={deliverable}
                                        className="flex gap-3 text-xs leading-5 text-nm-muted"
                                    >
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nm-text" />
                                        <span>{deliverable}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-auto pt-6">
                                <p className="nm-tag inline-block px-3 py-1.5 text-base">
                                    Best fit: {service.fit}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

            <div className="mt-8 flex justify-center">
                <a href="#contact" className="nm-btn-primary px-6 py-3">
                    Discuss your project <FiArrowUpRight size={15} />
                </a>
            </div>
        </section>
    );
}

export default Services;
