"use client";

import { experiences } from "@/utils/data/experience";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

function Experience() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                ".exp-card",
                { opacity: 0, y: 40, rotateX: -14, transformPerspective: 800, transformOrigin: "50% 100%" },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
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
        <section ref={containerRef} id="experience" className="nm-section">
            <SectionHeading title="Experience" />

            <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="exp-card nm-surface relative flex flex-col gap-3 rounded-[20px] p-6 shadow-nm-raised"
                    >
                        <span className="nm-tag w-fit px-3.5 py-1.5 text-base text-nm-muted">
                            {exp.duration.replace(/[()]/g, "")}
                        </span>

                        <div className="pr-12">
                            <h3 className="text-base font-extrabold leading-snug text-nm-text">
                                {exp.company.replace(/\.$/, "")}
                            </h3>
                            <p className="mt-1 text-xs text-nm-muted">{exp.title}</p>
                        </div>

                        <div className="nm-surface absolute bottom-6 right-6 flex h-9 w-9 items-center justify-center rounded-full text-sm font-black text-nm-muted shadow-nm-inset">
                            {exp.company.trim().charAt(0)}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Experience;
