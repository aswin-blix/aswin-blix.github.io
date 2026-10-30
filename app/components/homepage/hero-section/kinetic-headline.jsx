"use client";

import { personalData } from "@/utils/data/personal-data";
import { Fragment, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const SECOND_LINE = ["custom", "apps", "&", "business", "systems."];

// Hero headline adapted from NullMotion's "22-kinetic-headline" template:
// side words slide in from blur, the key word extrudes as a raised pill,
// then a sheen + spark sweep across it. Greyscale only, driven by nm tokens.
function KineticHeadline({ delay = 0 }) {
    const headlineRef = useRef(null);

    useGSAP(
        () => {
            const mm = gsap.matchMedia();

            mm.add("(prefers-reduced-motion: no-preference)", () => {
                const pill = headlineRef.current.querySelector(".kh-pill");
                const tl = gsap.timeline({ delay, defaults: { ease: "power4.out" } });

                tl.fromTo(
                    ".kh-orbit",
                    { opacity: 0, scale: 0.9, rotation: -15 },
                    { opacity: 1, scale: 1, rotation: -6, duration: 0.82, ease: "power3.inOut" },
                    0.04
                )
                    .from(".kh-guide", { scaleX: 0, duration: 0.68, ease: "power3.inOut" }, 0.08)
                    .fromTo(
                        ".kh-pill",
                        { scaleX: 0.93, scaleY: 1.06, y: 12, opacity: 0, filter: "blur(6px)" },
                        {
                            scaleX: 1.08,
                            scaleY: 0.95,
                            y: -4,
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 0.43,
                            ease: "power3.out",
                        },
                        0.2
                    )
                    .to(".kh-pill", { scaleX: 1, scaleY: 1, y: 0, duration: 0.34, ease: "back.out(1.55)" }, 0.57)
                    .from(
                        ".kh-word",
                        { x: 112, y: -18, rotation: 1.2, opacity: 0, filter: "blur(8px)", duration: 0.72 },
                        0.29
                    )
                    .from(
                        ".kh-rise",
                        { yPercent: 110, opacity: 0, filter: "blur(6px)", duration: 0.7, stagger: 0.06 },
                        0.45
                    )
                    // Spark rides the pill's edge while the sheen sweeps its face.
                    .set(".kh-spark", { opacity: 1, x: 0 }, 1.0)
                    .to(".kh-spark", { x: () => pill.offsetWidth, y: -4, duration: 0.68, ease: "power3.inOut" }, 1.01)
                    .to(".kh-spark", { opacity: 0, duration: 0.2, ease: "sine.out" }, 1.5)
                    .fromTo(
                        ".kh-sheen",
                        { left: "-40%", opacity: 0 },
                        { left: "118%", opacity: 1, duration: 0.76, ease: "power3.inOut" },
                        1.0
                    )
                    .to(".kh-sheen", { opacity: 0, duration: 0.18, ease: "sine.out" }, 1.58);

                // Slow ambient drift after the entrance settles.
                gsap.to(".kh-orbit", {
                    rotation: -4,
                    x: -9,
                    duration: 4,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: -1,
                    delay: delay + 1.2,
                });
            });
        },
        { scope: headlineRef }
    );

    return (
        <h1
            ref={headlineRef}
            aria-label={`${personalData.name} — ${personalData.designation}`}
            className="relative isolate w-full min-w-0 max-w-3xl text-[clamp(38px,5.6vw,68px)] font-black leading-[1.08] tracking-[-0.045em]"
        >
            <span
                aria-hidden="true"
                className="kh-orbit pointer-events-none absolute inset-x-[4%] inset-y-[6%] -z-10 -rotate-6 rounded-[50%] border text-nm-faint [border-color:color-mix(in_srgb,currentColor_30%,transparent)]"
            />

            <span aria-hidden="true" className="block">
                <span className="relative mr-[0.22em] inline-block align-baseline">
                    {/* Clip the sheen on an inner layer: overflow-hidden on the pill
                        itself would move its baseline off the text. */}
                    <span className="kh-pill nm-surface relative inline-block rounded-full px-[0.38em] pb-[0.12em] pt-[0.04em] text-nm-text shadow-nm-raised-lg">
                        <span className="relative z-[1]">Shopify</span>
                        <span className="absolute inset-0 z-[2] overflow-hidden rounded-full">
                            <span className="kh-sheen nm-sheen absolute -top-[20%] left-[-40%] h-[140%] w-[26%] -skew-x-[16deg] opacity-0" />
                        </span>
                    </span>
                    <span className="kh-spark absolute left-0 top-1/2 -mt-1 h-2 w-2 rounded-full bg-nm-text opacity-0 shadow-[0_0_14px_var(--nm-text)]" />
                </span>
                <span className="kh-word inline-block text-nm-text">storefronts,</span>
            </span>

            <span aria-hidden="true" className="mt-[0.12em] block text-nm-muted">
                {SECOND_LINE.map((word, i) => (
                    <Fragment key={word}>
                        <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                            <span className="kh-rise inline-block">{word}</span>
                        </span>
                        {i < SECOND_LINE.length - 1 && " "}
                    </Fragment>
                ))}
            </span>

            <span aria-hidden="true" className="kh-guide nm-rule mt-6 block w-full max-w-md origin-left" />
        </h1>
    );
}

export default KineticHeadline;
