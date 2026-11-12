"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

// Homepage chapters, in page order. `id` matches each section's id.
const CHAPTERS = [
    { id: "hero", label: "Start" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Work" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
];

// Scroll to a chapter. Pinned sections sit inside a GSAP .pin-spacer, whose
// top is the true document position.
function goTo(id) {
    if (id === CHAPTERS[0].id) {
        window.scrollTo({ top: 0 });
        return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const anchor = el.closest(".pin-spacer") || el;
    window.scrollTo({ top: anchor.getBoundingClientRect().top + window.scrollY - 88 });
}

// Chapter dots (wide screens) and a "Next" pill that always names the next
// section, so every scroll has a visible destination. The pill is hidden on
// phones, where it would cover the text being read.
export default function ScrollGuide() {
    const [active, setActive] = useState(0);
    const activeRef = useRef(0);

    useEffect(() => {
        let raf = 0;
        const update = () => {
            raf = 0;
            const mid = window.innerHeight * 0.5;
            let index = 0;
            CHAPTERS.forEach((chapter, i) => {
                const el = document.getElementById(chapter.id);
                if (el && el.getBoundingClientRect().top <= mid) index = i;
            });
            const doc = document.documentElement;
            if (doc.scrollTop >= doc.scrollHeight - doc.clientHeight - 80) {
                index = CHAPTERS.length - 1;
            }
            if (index !== activeRef.current) {
                activeRef.current = index;
                setActive(index);
            }
        };
        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        update();
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
            cancelAnimationFrame(raf);
        };
    }, []);

    const next = CHAPTERS[active + 1];

    return (
        <>
            <nav
                aria-label="Page chapters"
                className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3.5 xl:flex"
            >
                {CHAPTERS.map((chapter, index) => (
                    <button
                        key={chapter.id}
                        type="button"
                        onClick={() => goTo(chapter.id)}
                        aria-label={chapter.label}
                        aria-current={index === active ? "true" : undefined}
                        className="group flex items-center gap-2.5"
                    >
                        <span className="nm-surface pointer-events-none translate-x-1 rounded-full px-3 py-0.5 font-mono text-base font-semibold text-nm-text opacity-0 shadow-nm-raised-sm transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                            {chapter.label}
                        </span>
                        <span
                            className={`h-3.5 w-3.5 rounded-full transition duration-200 ${
                                index === active
                                    ? "scale-110 bg-nm-text shadow-nm-raised-sm"
                                    : "shadow-nm-inset-sm"
                            }`}
                        />
                    </button>
                ))}
            </nav>

            <button
                type="button"
                onClick={() => goTo(next ? next.id : CHAPTERS[0].id)}
                className="nm-surface fixed bottom-4 left-1/2 z-40 hidden max-w-[calc(100vw-2rem)] -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full px-5 py-2.5 text-base font-bold text-nm-text shadow-nm-raised sm:inline-flex"
            >
                <span className="font-mono font-semibold uppercase tracking-wider text-nm-faint">
                    {next ? "Next" : "End"}
                </span>
                {next ? next.label : "Back to top"}
                {next ? <FiArrowDown size={16} /> : <FiArrowUp size={16} />}
            </button>
        </>
    );
}
