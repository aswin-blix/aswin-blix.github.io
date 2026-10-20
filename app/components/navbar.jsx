"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FiSun, FiMoon, FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const [mounted, setMounted] = useState(false);
    const lastScrollY = useRef(0);
    const navRef = useRef(null);
    const iconRef = useRef(null);
    const { theme, resolvedTheme, setTheme } = useTheme();

    // The currently-applied theme, with a DOM fallback so the toggle never no-ops.
    const activeTheme =
        resolvedTheme ||
        theme ||
        (typeof document !== "undefined" && document.documentElement.classList.contains("dark")
            ? "dark"
            : "light");

    useEffect(() => setMounted(true), []);

    // Hide-on-scroll-down, show-on-scroll-up
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            if (currentY < 10) {
                setVisible(true);
            } else if (currentY < lastScrollY.current) {
                setVisible(true);
            } else if (currentY > lastScrollY.current + 5) {
                setVisible(false);
                setIsOpen(false);
            }
            lastScrollY.current = currentY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Stagger nav links in on mount
    useGSAP(
        () => {
            gsap.fromTo(
                ".nm-nav-item",
                { opacity: 0, y: -10 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.07,
                    ease: "power3.out",
                    delay: 0.1,
                }
            );
        },
        { scope: navRef }
    );

    const toggleTheme = () => {
        const next = activeTheme === "dark" ? "light" : "dark";
        setTheme(next);
        if (iconRef.current) {
            gsap.fromTo(
                iconRef.current,
                { rotation: 0, scale: 1 },
                {
                    rotation: 180,
                    scale: 1.3,
                    duration: 0.3,
                    ease: "back.out(2)",
                    onComplete: () => gsap.set(iconRef.current, { rotation: 0, scale: 1 }),
                }
            );
        }
    };

    const pressDown = (e) =>
        gsap.to(e.currentTarget, { boxShadow: "var(--nm-inset)", scale: 0.97, duration: 0.1 });
    const pressUp = (e) =>
        gsap.to(e.currentTarget, { boxShadow: "var(--nm-raised)", scale: 1, duration: 0.2 });

    return (
        <nav
            ref={navRef}
            className={`sticky top-4 z-50 transition-transform duration-300 ${
                visible ? "translate-y-0" : "-translate-y-[200%]"
            }`}
        >
            <div className="nm-surface nm-raised flex items-center justify-between gap-4 rounded-[60px] px-5 py-3 sm:px-6">
                {/* Brand */}
                <Link
                    href="/"
                    className="nm-nav-item shrink-0 text-[18px] font-black tracking-tight text-nm-text"
                >
                    AB<span className="text-nm-muted">.</span>
                </Link>

                {/* Center links — desktop */}
                <ul className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href} className="nm-nav-item">
                            <a
                                href={link.href}
                                className="block rounded-full px-4 py-2 text-[13px] font-medium text-nm-muted transition-all duration-200 hover:text-nm-text hover:shadow-nm-inset"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right cluster */}
                <div className="flex items-center gap-2.5">
                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle color theme"
                        className="nm-nav-item nm-icon-btn h-9 w-9 text-nm-text"
                    >
                        <span ref={iconRef} className="flex items-center justify-center">
                            {mounted && activeTheme === "dark" ? (
                                <FiSun size={16} />
                            ) : (
                                <FiMoon size={16} />
                            )}
                        </span>
                    </button>

                    <a
                        href="#contact"
                        onMouseDown={pressDown}
                        onMouseUp={pressUp}
                        onMouseLeave={pressUp}
                        className="nm-nav-item nm-btn hidden gap-1.5 px-5 py-2 text-[13px] sm:inline-flex"
                    >
                        Hire me
                        <FiArrowUpRight size={15} />
                    </a>

                    {/* Mobile toggle */}
                    <button
                        onClick={() => setIsOpen((v) => !v)}
                        aria-label="Toggle navigation"
                        className="nm-icon-btn h-9 w-9 text-nm-text md:hidden"
                    >
                        {isOpen ? <FiX size={16} /> : <FiMenu size={16} />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`nm-surface nm-raised mt-3 overflow-hidden rounded-[28px] transition-all duration-300 md:hidden ${
                    isOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 py-0 opacity-0"
                }`}
            >
                <ul className="flex flex-col gap-1 p-4">
                    {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="block rounded-full px-4 py-2.5 text-sm font-medium text-nm-muted transition-all duration-200 hover:text-nm-text hover:shadow-nm-inset"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                    <li>
                        <a
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="nm-btn mt-1 w-full gap-1.5"
                        >
                            Hire me <FiArrowUpRight size={15} />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
