"use client";

import { careerStartYear, personalData } from "@/utils/data/personal-data";
import { projectsData } from "@/utils/data/projects-data";
import { servicesData } from "@/utils/data/services-data";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowDown, FiArrowUpRight, FiDownload } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const ROTATION = personalData.heroRotation;

const STATS = [
    { value: new Date().getFullYear() - careerStartYear, suffix: "+", label: "Years" },
    {
        value: projectsData.filter((project) => project.featured).length,
        suffix: "",
        label: "Featured Builds",
    },
    { value: servicesData.length, suffix: "", label: "Core Services" },
    { value: careerStartYear, suffix: "", label: "Since" },
];

// Dial geometry: the pointer sweeps from -120deg to +120deg across the labels.
const DIAL_START = -120;
const DIAL_SWEEP = 240;
const DIAL_RADIUS = 148;

function dialLabelStyle(index) {
    const angle = DIAL_START + (DIAL_SWEEP / (ROTATION.length - 1)) * index;
    const rad = (angle * Math.PI) / 180;
    const x = Math.round(Math.sin(rad) * DIAL_RADIUS);
    const y = Math.round(-Math.cos(rad) * DIAL_RADIUS);
    return { transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` };
}

function HeroSection() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const q = gsap.utils.selector(containerRef);
            const words = q(".hero-words")[0];
            const pointer = q(".hero-pointer")[0];
            const count = q(".hero-count")[0];
            const marks = q("[data-stage]");
            const last = ROTATION.length - 1;
            let stage = 0;

            // Show one rotation entry: slide the word list and light its dial label.
            const setStage = (index) => {
                if (index === stage) return;
                stage = index;
                gsap.to(words, {
                    yPercent: (-100 / ROTATION.length) * index,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: true,
                });
                marks.forEach((mark) => {
                    const at = Number(mark.dataset.stage);
                    const on = mark.dataset.fill === "true" ? at <= index : at === index;
                    mark.dataset.on = String(on);
                });
                count.textContent = index + 1;
            };

            gsap.fromTo(
                ".hero-rise",
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" }
            );

            // Stat count-up on scroll-enter
            q(".stat-num").forEach((el) => {
                gsap.fromTo(
                    el,
                    { textContent: 0 },
                    {
                        textContent: Number(el.dataset.value),
                        duration: 1.6,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        scrollTrigger: { trigger: el, start: "top 92%" },
                    }
                );
            });

            const mm = gsap.matchMedia();
            mm.add(
                {
                    // Tall desktop screens: hold the hero and let scroll turn the dial.
                    pin: "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
                    motion: "(prefers-reduced-motion: no-preference)",
                },
                (context) => {
                    const { pin, motion } = context.conditions;

                    if (pin) {
                        ScrollTrigger.create({
                            trigger: ".hero-pin",
                            start: "top 96px",
                            end: "+=1700",
                            pin: true,
                            scrub: true,
                            onUpdate: (self) => {
                                gsap.set(pointer, {
                                    rotation: DIAL_START + self.progress * DIAL_SWEEP,
                                });
                                setStage(
                                    Math.min(last, Math.floor(self.progress * ROTATION.length))
                                );
                            },
                        });
                        return;
                    }

                    if (!motion) return;

                    // Phones and short screens: no pinning, the slot rotates on a timer.
                    let call;
                    const tick = () => {
                        const next = (stage + 1) % ROTATION.length;
                        setStage(next);
                        gsap.to(pointer, {
                            rotation: DIAL_START + (DIAL_SWEEP / last) * next,
                            duration: 0.5,
                            ease: "power3.out",
                        });
                        call = gsap.delayedCall(2.4, tick);
                    };
                    call = gsap.delayedCall(2.4, tick);
                    return () => call.kill();
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="hero">
            <div className="hero-pin flex items-center py-8 sm:py-12 lg:min-h-[calc(100svh-7.5rem)]">
                <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-5 lg:gap-12 xl:gap-16">
                    {/* LEFT — headline with the rotating slot */}
                    <div className="min-w-0 lg:col-span-3">
                        <span className="hero-rise nm-surface mb-7 inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-base font-medium text-nm-muted shadow-nm-inset-sm">
                            <span className="h-2 w-2 rounded-full bg-nm-text" />
                            {personalData.availability}
                        </span>

                        <h1
                            aria-label={`${personalData.name} — ${personalData.designation}`}
                            className="hero-rise nm-display text-[clamp(34px,4.4vw,64px)] leading-none max-sm:text-[7.2vw]"
                        >
                            <span className="text-nm-muted">I build</span>
                            <span className="nm-slot text-nm-text">
                                <ul className="hero-words">
                                    {ROTATION.map((entry) => (
                                        <li key={entry.text}>{entry.text}</li>
                                    ))}
                                </ul>
                            </span>
                            <span className="text-nm-muted">that are ready to run.</span>
                        </h1>

                        {/* Segment bar: the dial's stand-in on smaller screens */}
                        <div
                            aria-hidden="true"
                            className="mt-6 flex gap-2 motion-reduce:hidden lg:hidden"
                        >
                            {ROTATION.map((entry, index) => (
                                <span
                                    key={entry.label}
                                    data-stage={index}
                                    data-fill="true"
                                    data-on={index === 0}
                                    className="h-2 w-14 rounded-full shadow-nm-inset-sm transition-colors duration-300 data-[on=true]:bg-nm-text data-[on=true]:shadow-none"
                                />
                            ))}
                        </div>

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

                    {/* RIGHT — dial (desktop only) */}
                    <div
                        aria-hidden="true"
                        className="hero-rise relative mx-auto hidden h-[340px] w-[340px] motion-reduce:hidden lg:col-span-2 lg:block"
                    >
                        {ROTATION.map((entry, index) => (
                            <span
                                key={entry.label}
                                data-stage={index}
                                data-on={index === 0}
                                style={dialLabelStyle(index)}
                                className="absolute left-1/2 top-1/2 whitespace-nowrap font-mono text-base font-semibold text-nm-faint transition-colors duration-300 data-[on=true]:text-nm-text"
                            >
                                {entry.label}
                            </span>
                        ))}
                        <div className="nm-surface absolute inset-[68px] grid place-items-center rounded-full shadow-nm-raised-lg">
                            <div className="absolute inset-[18px] rounded-full shadow-nm-inset" />
                            <div
                                className="hero-pointer absolute inset-0"
                                style={{ transform: `rotate(${DIAL_START}deg)` }}
                            >
                                <span className="absolute left-1/2 top-[26px] -ml-1 h-[30px] w-2 rounded-full bg-nm-text" />
                            </div>
                            <span className="relative font-mono text-3xl font-bold text-nm-text">
                                <span className="hero-count">1</span>
                                <span className="text-lg text-nm-faint">/{ROTATION.length}</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 gap-4 pb-6 lg:grid-cols-4">
                {STATS.map((stat) => (
                    <div
                        key={stat.label}
                        className="nm-surface flex flex-col items-start gap-1 rounded-3xl p-5 shadow-nm-raised"
                    >
                        <div className="nm-display flex items-end text-[34px] leading-none text-nm-text sm:text-[44px]">
                            <span className="stat-num" data-value={stat.value}>
                                {stat.value}
                            </span>
                            <span>{stat.suffix}</span>
                        </div>
                        <span className="nm-label">{stat.label}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default HeroSection;
