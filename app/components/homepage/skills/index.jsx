"use client";

import { skillsData } from "@/utils/data/skills";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

// Split the skills into rows that drift in opposite directions on scroll.
const ROW_COUNT = 3;
const PER_ROW = Math.ceil(skillsData.length / ROW_COUNT);
const ROWS = Array.from({ length: ROW_COUNT }, (_, row) =>
    skillsData.slice(row * PER_ROW, (row + 1) * PER_ROW)
);
const DRIFT = 30; // percent of the row's own width

function Skills() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            mm.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.utils.toArray(".skill-row", containerRef.current).forEach((row, index) => {
                    const reverse = index % 2 === 1;
                    gsap.fromTo(
                        row,
                        { xPercent: reverse ? -DRIFT : 0 },
                        {
                            xPercent: reverse ? 0 : -DRIFT,
                            ease: "none",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        }
                    );
                });
            });
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="skills" className="nm-section">
            <SectionHeading title="Skills" />

            {/* Rows are wider than the page on purpose; this wrapper clips them at the
                page shell's edge (negative margin = the shell's gutter).
                Reduced motion: rows wrap into a static cloud and the repeats hide. */}
            <div className="-mx-5 grid gap-4 overflow-x-clip px-5 sm:-mx-8 sm:px-8 xl:-mx-10 xl:px-10">
                {ROWS.map((row, index) => (
                    <div
                        key={index}
                        className="skill-row flex w-max gap-3.5 py-2 motion-reduce:w-auto motion-reduce:flex-wrap"
                    >
                        {row.map((skill) => (
                            <span key={skill} className="nm-chip cursor-default whitespace-nowrap">
                                {skill}
                            </span>
                        ))}
                        {row.map((skill) => (
                            <span
                                key={`${skill}-repeat`}
                                aria-hidden="true"
                                className="nm-chip cursor-default whitespace-nowrap motion-reduce:hidden"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Skills;
