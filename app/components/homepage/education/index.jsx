"use client";

import { educations } from "@/utils/data/educations";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

// Short badge for the inset circle, derived from the degree title.
function abbreviate(title) {
    const t = title.toLowerCase();
    if (t.includes("bachelor")) return "BSc";
    if (t.includes("diploma")) return "Dip";
    if (t.includes("higher secondary")) return "HSC";
    if (t.includes("secondary")) return "SSC";
    return title
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 3)
        .toUpperCase();
}

function Education() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".edu-card",
                { opacity: 0, y: 40, rotateX: -14, transformPerspective: 800, transformOrigin: "50% 100%" },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="education" className="nm-section">
            <SectionHeading title="Education" />

            {/* Responsive grid: 2×2 on mobile, single row on desktop —
                no horizontal scroll, no clipped shadows. */}
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
                {educations.map((edu) => (
                    <div
                        key={edu.id}
                        className="edu-card nm-surface flex flex-col items-center justify-center gap-4 rounded-[20px] p-5 text-center shadow-nm-raised sm:gap-5 sm:p-7"
                    >
                        <span className="nm-tag px-3 py-1.5 text-base text-nm-muted sm:px-3.5">
                            {edu.duration}
                        </span>

                        <div className="nm-surface flex h-16 w-16 items-center justify-center rounded-full text-sm font-black tracking-tight text-nm-text shadow-nm-inset sm:h-20 sm:w-20 sm:text-base">
                            {abbreviate(edu.title)}
                        </div>

                        <div>
                            <h3 className="text-base font-extrabold leading-snug text-nm-text">
                                {edu.title}
                            </h3>
                            <p className="mt-1.5 text-base text-nm-muted">
                                {edu.institution}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Education;
