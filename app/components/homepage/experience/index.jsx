"use client";

import { educations } from "@/utils/data/educations";
import { experiences } from "@/utils/data/experience";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

const startYear = (duration) => Number(duration.match(/\d{4}/)?.[0] ?? 0);
const newestFirst = (a, b) => b.year - a.year;

// One time rail: work history first, then education, each newest first.
const WORK = experiences
    .map((exp) => ({
        key: `exp-${exp.id}`,
        title: exp.title,
        place: exp.company.replace(/\.$/, ""),
        when: exp.duration.replace(/[()]/g, ""),
        year: startYear(exp.duration),
    }))
    .sort(newestFirst);

const STUDY = educations
    .map((edu) => ({
        key: `edu-${edu.id}`,
        title: edu.title,
        place: edu.institution,
        when: edu.duration,
        year: startYear(edu.duration),
    }))
    .sort(newestFirst);

function Stop({ stop }) {
    return (
        <div
            data-year={stop.year}
            data-title={stop.title}
            className="path-stop nm-surface rounded-3xl p-5 shadow-nm-raised-sm transition-[box-shadow,transform] duration-300 data-[on=true]:shadow-nm-raised-lg sm:p-6 lg:data-[on=true]:translate-x-2"
        >
            <h3 className="nm-display text-xl text-nm-text">{stop.title}</h3>
            <p className="mt-1 text-base text-nm-muted">{stop.place}</p>
            <span className="nm-tag mt-3 inline-block px-3.5 py-1.5 text-nm-muted">{stop.when}</span>
        </div>
    );
}

function Experience() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const q = gsap.utils.selector(containerRef);
            const yearEl = q(".path-year")[0];
            const caption = q(".path-caption")[0];
            const counter = { value: WORK[0]?.year ?? 0 };

            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                // The rail fills as the list scrolls through the viewport.
                gsap.fromTo(
                    ".path-fill",
                    { scaleY: 0.03 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: ".path-line",
                            start: "top 60%",
                            end: "bottom 60%",
                            scrub: true,
                        },
                    }
                );

                // Each stop lifts while active and rolls the big year to its start year.
                q(".path-stop").forEach((stop) => {
                    ScrollTrigger.create({
                        trigger: stop,
                        start: "top 60%",
                        end: "bottom 60%",
                        onToggle: (self) => {
                            stop.dataset.on = String(self.isActive);
                            if (!self.isActive) return;
                            caption.textContent = stop.dataset.title;
                            gsap.to(counter, {
                                value: Number(stop.dataset.year),
                                duration: 0.5,
                                ease: "power2.out",
                                overwrite: true,
                                onUpdate: () => {
                                    yearEl.textContent = Math.round(counter.value);
                                },
                            });
                        },
                    });
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="experience" className="nm-section">
            <SectionHeading title="Experience" />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
                {/* Sticky year readout (decorative; every stop carries its own dates) */}
                <div aria-hidden="true" className="motion-reduce:hidden lg:sticky lg:top-[30vh] lg:self-start">
                    <div className="path-year nm-display nm-emboss text-[clamp(64px,11vw,170px)] leading-[0.9] tabular-nums">
                        {WORK[0]?.year}
                    </div>
                    <p className="path-caption mt-3 text-base text-nm-muted">{WORK[0]?.title}</p>
                </div>

                <div className="path-line relative grid gap-5 pl-9">
                    <span
                        aria-hidden="true"
                        className="absolute bottom-1.5 left-1.5 top-1.5 w-2 rounded-full shadow-nm-inset-sm"
                    />
                    <span
                        aria-hidden="true"
                        className="path-fill absolute bottom-1.5 left-1.5 top-1.5 w-2 origin-top rounded-full bg-nm-text"
                    />

                    {WORK.map((stop) => (
                        <Stop key={stop.key} stop={stop} />
                    ))}

                    <h3 id="education" className="nm-section-title mt-4 scroll-mt-24">
                        Education
                    </h3>

                    {STUDY.map((stop) => (
                        <Stop key={stop.key} stop={stop} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
