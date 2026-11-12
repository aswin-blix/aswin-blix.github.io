"use client";

import { servicesData } from "@/utils/data/services-data";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    FiBox,
    FiCloud,
    FiLayout,
    FiShoppingBag,
    FiSmartphone,
    FiArrowUpRight,
} from "react-icons/fi";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

const SERVICE_ICONS = {
    "shopify-themes": FiLayout,
    "shopify-apps": FiBox,
    "headless-commerce": FiShoppingBag,
    "business-cloud": FiCloud,
    "mobile-apps": FiSmartphone,
};

const TOTAL = servicesData.length;

function Services() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const q = gsap.utils.selector(containerRef);
            const pinEl = q(".svc-pin")[0];
            const viewport = q(".svc-viewport")[0];
            const track = q(".svc-track")[0];
            const count = q(".svc-count")[0];
            const bar = q(".svc-bar")[0];

            // progress 0..1 across the track -> counter + progress bar
            const setProgress = (progress) => {
                count.textContent = Math.min(TOTAL, Math.floor(progress * (TOTAL - 0.001)) + 1);
                gsap.set(bar, { scaleX: (1 + progress * (TOTAL - 1)) / TOTAL });
            };
            setProgress(0);

            const mm = gsap.matchMedia();
            mm.add(
                {
                    pin: "(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)",
                },
                (context) => {
                    if (context.conditions.pin) {
                        // Desktop: vertical scroll slides the panels sideways.
                        viewport.dataset.pinned = "true";
                        const distance = () =>
                            Math.max(0, track.scrollWidth - viewport.clientWidth);
                        gsap.to(track, {
                            x: () => -distance(),
                            ease: "none",
                            scrollTrigger: {
                                trigger: pinEl,
                                start: "center center",
                                end: () => `+=${distance()}`,
                                pin: true,
                                scrub: 0.5,
                                invalidateOnRefresh: true,
                                onUpdate: (self) => setProgress(self.progress),
                            },
                        });
                        return () => {
                            delete viewport.dataset.pinned;
                            gsap.set(track, { x: 0 });
                            setProgress(0);
                        };
                    }

                    // Phones, short screens, reduced motion: a native swipe row.
                    const onScroll = () => {
                        const max = viewport.scrollWidth - viewport.clientWidth;
                        setProgress(max > 0 ? viewport.scrollLeft / max : 0);
                    };
                    viewport.addEventListener("scroll", onScroll, { passive: true });
                    return () => viewport.removeEventListener("scroll", onScroll);
                }
            );
        },
        { scope: containerRef }
    );

    return (
        <section ref={containerRef} id="services" className="nm-section">
            <SectionHeading title="What You Can Hire Me For" />

            <div className="mb-10 max-w-3xl">
                <h2 className="nm-display text-3xl text-nm-text sm:text-4xl lg:text-5xl">
                    Practical delivery for stores, apps, and the systems behind them.
                </h2>
                <p className="mt-4 text-sm leading-7 text-nm-muted">
                    I can own a complete build, join an existing codebase, rescue a difficult feature,
                    or provide ongoing development and production support.
                </p>
            </div>

            <div className="svc-pin">
                <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="nm-label">Services</span>
                    <span className="font-mono text-xl font-bold text-nm-text" aria-hidden="true">
                        <span className="svc-count">1</span>
                        <span className="text-base text-nm-faint"> / {TOTAL}</span>
                    </span>
                </div>

                {/* Negative margin + padding keep the card shadows from being clipped. */}
                <div className="svc-viewport nm-no-scrollbar -mx-5 snap-x snap-mandatory overflow-x-auto px-5 py-7 data-[pinned=true]:snap-none data-[pinned=true]:overflow-visible sm:-mx-8 sm:px-8 xl:-mx-10 xl:px-10">
                    <div className="svc-track flex w-max gap-6 lg:gap-8">
                        {servicesData.map((service) => {
                            const Icon = SERVICE_ICONS[service.id] ?? FiBox;

                            return (
                                <article
                                    key={service.id}
                                    className="nm-surface flex w-[min(82vw,760px)] shrink-0 snap-start scroll-ml-5 flex-col rounded-[32px] p-6 shadow-nm-raised-lg sm:scroll-ml-8 sm:p-9"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="nm-surface flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-nm-text shadow-nm-inset">
                                            <Icon size={22} />
                                        </div>
                                        <h3 className="nm-display text-2xl text-nm-text sm:text-3xl">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="mt-4 max-w-2xl text-sm leading-6 text-nm-muted">
                                        {service.summary}
                                    </p>

                                    <ul className="mt-5 space-y-3">
                                        {service.deliverables.map((deliverable) => (
                                            <li
                                                key={deliverable}
                                                className="flex gap-3 text-xs leading-6 text-nm-muted"
                                            >
                                                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-nm-text" />
                                                <span>{deliverable}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="mt-auto pt-6 text-base leading-6 text-nm-muted">
                                        <span className="nm-surface block rounded-2xl px-4 py-3 shadow-nm-inset-sm">
                                            <span className="font-bold text-nm-text">Best fit:</span>{" "}
                                            {service.fit}
                                        </span>
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>

                <div
                    className="mt-3 h-2 overflow-hidden rounded-full shadow-nm-inset-sm"
                    aria-hidden="true"
                >
                    <div className="svc-bar h-full w-full origin-left rounded-full bg-nm-text" />
                </div>
            </div>

            <div className="mt-10 flex justify-center">
                <a href="#contact" className="nm-btn-primary px-6 py-3">
                    Discuss your project <FiArrowUpRight size={15} />
                </a>
            </div>
        </section>
    );
}

export default Services;
