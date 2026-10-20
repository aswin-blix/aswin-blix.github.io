"use client";

import { careerStartYear, personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { FiArrowDown, FiArrowUpRight, FiDownload } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const STATS = [
    { value: new Date().getFullYear() - careerStartYear, suffix: "+", label: "Years" },
    {
        value: projectsData.filter((project) => project.featured).length,
        suffix: "",
        label: "Featured Builds",
    },
    { value: 4, suffix: "", label: "Core Services" },
    { value: careerStartYear, suffix: "", label: "Since" },
];

function HeroSection() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.fromTo(
                ".hero-rise",
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" }
            )
                .from(
                    ".hero-scramble",
                    {
                        duration: 1.4,
                        scrambleText: { chars: "upperAndLowerCase", speed: 0.35 },
                        stagger: 0.15,
                    },
                    "-=0.9"
                )
                .fromTo(
                    ".hero-code",
                    { opacity: 0, x: 40 },
                    { opacity: 1, x: 0, duration: 0.9, ease: "power3.out" },
                    "-=1.1"
                );

            // Depth parallax: the stats/code column drifts slower than the
            // headline as the hero scrolls away.
            gsap.to(".hero-parallax", {
                yPercent: -16,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.5,
                },
            });

            // Stat count-up on scroll-enter
            gsap.utils.toArray(".stat-num").forEach((el) => {
                const target = Number(el.dataset.value);
                gsap.fromTo(
                    el,
                    { textContent: 0 },
                    {
                        textContent: target,
                        duration: 1.6,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        scrollTrigger: { trigger: el, start: "top 90%" },
                    }
                );
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} className="py-8 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-5 lg:gap-12 xl:gap-16">
                {/* min-w-0 + emergency wrapping contain ScrambleText's temporary unbroken text. */}
                {/* LEFT — 60% */}
                <div className="min-w-0 lg:col-span-3">
                    <span className="hero-rise nm-surface mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-base font-semibold uppercase tracking-wider text-nm-muted shadow-nm-inset">
                        <span className="h-2 w-2 rounded-full bg-nm-text" />
                        {personalData.availability}
                    </span>

                    <h1
                        aria-label={`${personalData.name} — ${personalData.designation}`}
                        className="w-full min-w-0 max-w-3xl [overflow-wrap:anywhere] text-[clamp(38px,5.6vw,68px)] font-black leading-[1] tracking-[-0.045em]"
                    >
                        <span className="hero-rise hero-scramble text-nm-text">
                            Shopify storefronts,
                        </span>{" "}
                        <span className="hero-rise hero-scramble text-nm-muted">
                            custom apps &amp; business systems.
                        </span>
                    </h1>

                    <p className="hero-rise mt-6 max-w-2xl text-base font-medium leading-7 text-nm-muted">
                        {personalData.headline}
                    </p>
                    <p className="hero-rise mt-3 font-mono text-base leading-6 text-nm-faint">
                        {personalData.name} · {personalData.designation} · Remote from India
                    </p>

                    <div className="hero-rise mt-9 flex flex-wrap items-center gap-3">
                        <a href="#contact" className="nm-btn-primary px-6 py-3">
                            Discuss Your Project
                            <FiArrowUpRight size={15} />
                        </a>
                        <a href="#projects" className="nm-btn px-6 py-3">
                            View Selected Work
                            <FiArrowDown size={15} />
                        </a>
                        <Link
                            href={personalData.resume}
                            className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-nm-muted transition-colors hover:text-nm-text"
                        >
                            Resume
                            <FiDownload size={15} />
                        </Link>
                    </div>
                </div>

                {/* RIGHT — 40% */}
                <div className="hero-parallax min-w-0 lg:col-span-2">
                    <div className="grid grid-cols-2 gap-4">
                        {STATS.map((stat) => (
                            <div
                                key={stat.label}
                                className="nm-surface flex flex-col items-start gap-1 rounded-3xl p-5 shadow-nm-raised"
                            >
                                <div className="flex items-end text-[34px] font-black leading-none tracking-tight text-nm-text">
                                    <span className="stat-num" data-value={stat.value}>
                                        0
                                    </span>
                                    <span>{stat.suffix}</span>
                                </div>
                                <span className="nm-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Code block */}
                    <div className="hero-code nm-surface mt-4 rounded-3xl p-5 shadow-nm-inset">
                        <pre className="overflow-x-auto font-mono text-base leading-relaxed text-nm-muted">
                            <code>
                                <span className="text-nm-faint">const</span>{" "}
                                <span className="text-nm-text">coder</span> = {"{"}
                                {"\n"}  name: <span className="text-nm-text">{"'Aswin Blix'"}</span>,
                                {"\n"}  role: <span className="text-nm-text">{"'Shopify + Full Stack'"}</span>,
                                {"\n"}  services: [<span className="text-nm-text">{"'themes'"}</span>,{" "}
                                <span className="text-nm-text">{"'apps'"}</span>,{" "}
                                <span className="text-nm-text">{"'cloud'"}</span>],
                                {"\n"}  delivery: [<span className="text-nm-text">{"'build'"}</span>,{" "}
                                <span className="text-nm-text">{"'test'"}</span>,{" "}
                                <span className="text-nm-text">{"'release'"}</span>],
                                {"\n"}  collaboration: <span className="text-nm-text">{"'remote'"}</span>,
                                {"\n"}  available: <span className="text-nm-text">true</span>,
                                {"\n"}
                                {"}"}
                                <span className="blink text-nm-text">_</span>
                            </code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
