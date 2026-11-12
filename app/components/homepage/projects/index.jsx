"use client";

import { projectsData } from "@/utils/data/projects-data";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    SiShopify,
    SiLaravel,
    SiVuedotjs,
    SiRemix,
    SiPython,
    SiFlutter,
    SiDotnet,
    SiReact,
    SiPhp,
    SiSass,
    SiNextdotjs,
} from "react-icons/si";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FiCode, FiArrowUpRight, FiGithub, FiChevronDown } from "react-icons/fi";
import ProjectModal from "./project-modal";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

// Featured projects form the scroll deck; everything else sits in the archive grid.
const featuredProjects = projectsData.filter((project) => project.featured);
const archiveProjects = projectsData.filter((project) => !project.featured);

// Pick a monochrome icon based on the project's tech stack.
const ICON_RULES = [
    [/shopify|liquid|hydrogen/i, SiShopify],
    [/odoo/i, TbBuildingWarehouse],
    [/remix/i, SiRemix],
    [/laravel/i, SiLaravel],
    [/vue/i, SiVuedotjs],
    [/flutter|dart/i, SiFlutter],
    [/\.net|c#|csharp/i, SiDotnet],
    [/python|tkinter/i, SiPython],
    [/scss|sass|design system/i, SiSass],
    [/next ?js|next\.js/i, SiNextdotjs],
    [/react/i, SiReact],
    [/php/i, SiPhp],
];

function pickIcon(project) {
    const haystack = `${project.name} ${project.tools.join(" ")} ${project.role}`;
    for (const [re, Icon] of ICON_RULES) {
        if (re.test(haystack)) return Icon;
    }
    return FiCode;
}

function ProjectLink({ project, size = 16 }) {
    const link = project.demo || project.code;
    if (!link) return null;
    return (
        <a
            href={link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Open ${project.name}`}
            className="text-nm-faint transition-colors duration-200 hover:text-nm-text"
        >
            {project.demo ? <FiArrowUpRight size={size} /> : <FiGithub size={size - 1} />}
        </a>
    );
}

function Projects() {
    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(null);

    const toggle = () => {
        const next = !expanded;
        setExpanded(next);
        // The archive changes the page height, so scroll positions must be re-measured.
        requestAnimationFrame(() => {
            if (next) {
                const cards = gridRef.current?.querySelectorAll(".project-card");
                if (cards) {
                    gsap.fromTo(
                        cards,
                        { opacity: 0, y: 40, rotateX: -16, transformPerspective: 800, transformOrigin: "50% 100%" },
                        { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }
                    );
                }
            }
            ScrollTrigger.refresh();
        });
    };

    useGSAP(
        () => {
            const mm = gsap.matchMedia();
            // Same condition as the .nm-deck-card sticky rule in globals.scss.
            mm.add(
                "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)",
                () => {
                    const cards = gsap.utils.toArray(".deck-card", containerRef.current);
                    cards.forEach((card, index) => {
                        const nextCard = cards[index + 1];
                        if (!nextCard) return;
                        // Each card shrinks back as the next one slides over it.
                        gsap.to(card, {
                            scale: 0.93,
                            ease: "none",
                            scrollTrigger: {
                                trigger: nextCard,
                                start: "top 85%",
                                end: "top 20%",
                                scrub: true,
                            },
                        });
                    });
                }
            );
        },
        { scope: containerRef }
    );

    const onEnter = (e) =>
        gsap.to(e.currentTarget, { y: -4, boxShadow: "var(--nm-raised-lg)", duration: 0.25 });
    const onLeave = (e) =>
        gsap.to(e.currentTarget, { y: 0, boxShadow: "var(--nm-raised)", duration: 0.25 });

    const openOnKey = (project) => (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setSelected(project);
        }
    };

    return (
        <section ref={containerRef} id="projects" className="nm-section">
            <SectionHeading title="Selected Work" />

            <div className="mb-10 max-w-3xl">
                <h2 className="nm-display text-3xl text-nm-text sm:text-4xl lg:text-5xl">
                    Commerce, operations, and production systems built end to end.
                </h2>
                <p className="mt-4 text-sm leading-7 text-nm-muted">
                    Featured projects lead with Shopify theme and app work. Private client systems
                    are clearly labelled where source code and live access cannot be shared.
                </p>
            </div>

            {/* Featured deck */}
            <div className="grid gap-7 lg:gap-14">
                {featuredProjects.map((project, index) => {
                    const Icon = pickIcon(project);

                    return (
                        <article
                            key={project.id}
                            style={{ "--i": index }}
                            onClick={() => setSelected(project)}
                            onKeyDown={openOnKey(project)}
                            role="button"
                            tabIndex={0}
                            aria-label={`View details for ${project.name}`}
                            className="deck-card nm-deck-card nm-surface group grid cursor-pointer gap-6 rounded-[32px] p-6 shadow-nm-raised-lg outline-none focus-visible:ring-2 focus-visible:ring-nm-text sm:p-9 lg:min-h-[400px] lg:grid-cols-[1.25fr_1fr] lg:gap-10"
                        >
                            <div className="min-w-0">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="nm-surface flex h-11 w-11 items-center justify-center rounded-xl text-nm-text shadow-nm-inset">
                                            <Icon size={20} />
                                        </div>
                                        <span className="font-mono text-base font-bold text-nm-faint">
                                            {index + 1} / {featuredProjects.length}
                                        </span>
                                    </div>
                                    <ProjectLink project={project} size={18} />
                                </div>

                                <h3 className="nm-display mt-5 text-2xl text-nm-text sm:text-3xl">
                                    {project.name}
                                </h3>
                                <p className="mt-4 line-clamp-5 text-sm leading-7 text-nm-muted">
                                    {project.description}
                                </p>

                                <div className="mt-5 flex flex-wrap gap-2">
                                    <span className="nm-tag text-nm-muted">{project.role}</span>
                                    {project.status && (
                                        <span className="nm-tag text-nm-muted">{project.status}</span>
                                    )}
                                </div>
                            </div>

                            <div className="flex min-w-0 flex-col gap-5">
                                {project.highlights?.length > 0 && (
                                    <ul className="nm-surface grid gap-3 rounded-3xl p-5 shadow-nm-inset">
                                        {project.highlights.map((highlight) => (
                                            <li
                                                key={highlight}
                                                className="flex gap-3 text-sm leading-6 text-nm-muted"
                                            >
                                                <FiArrowUpRight
                                                    size={16}
                                                    className="mt-1 shrink-0 text-nm-text"
                                                />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="flex flex-wrap items-center gap-1.5">
                                    {project.tools.map((tool) => (
                                        <span key={tool} className="nm-tag px-2 py-0.5">
                                            {tool}
                                        </span>
                                    ))}
                                </div>

                                <span className="mt-auto flex items-center gap-1 text-base font-semibold uppercase tracking-wider text-nm-faint transition-colors duration-200 group-hover:text-nm-text">
                                    View details
                                    <FiArrowUpRight size={14} />
                                </span>
                            </div>
                        </article>
                    );
                })}
            </div>

            {/* Archive grid */}
            {expanded && (
                <div ref={gridRef} className="mt-12 gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
                    {archiveProjects.map((project) => {
                        const Icon = pickIcon(project);
                        const tools = project.tools.slice(0, 4);
                        const extra = project.tools.length - tools.length;

                        return (
                            <article
                                key={project.id}
                                onMouseEnter={onEnter}
                                onMouseLeave={onLeave}
                                onClick={() => setSelected(project)}
                                onKeyDown={openOnKey(project)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View details for ${project.name}`}
                                className="project-card nm-surface group mb-5 flex cursor-pointer break-inside-avoid flex-col gap-3.5 rounded-[20px] p-5 shadow-nm-raised outline-none"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="nm-surface flex h-10 w-10 items-center justify-center rounded-xl text-nm-text shadow-nm-inset">
                                        <Icon size={18} />
                                    </div>
                                    <ProjectLink project={project} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-extrabold leading-snug text-nm-text">
                                        {project.name}
                                    </h3>
                                    <span className="nm-tag mt-2 inline-block text-nm-muted">
                                        {project.role}
                                    </span>
                                    {project.status && (
                                        <span className="nm-tag ml-1.5 mt-2 inline-block text-nm-muted">
                                            {project.status}
                                        </span>
                                    )}
                                </div>

                                <p className="line-clamp-3 text-xs leading-relaxed text-nm-muted">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-1.5">
                                    {tools.map((tool) => (
                                        <span key={tool} className="nm-tag px-2 py-0.5">
                                            {tool}
                                        </span>
                                    ))}
                                    {extra > 0 && <span className="nm-tag px-2 py-0.5">+{extra}</span>}
                                </div>

                                <span className="mt-1 flex items-center gap-1 text-base font-semibold uppercase tracking-wider text-nm-faint transition-colors duration-200 group-hover:text-nm-text">
                                    View details
                                    <FiArrowUpRight size={12} />
                                </span>
                            </article>
                        );
                    })}
                </div>
            )}

            {archiveProjects.length > 0 && (
                <div className="mt-10 flex justify-center">
                    <button onClick={toggle} className="nm-btn px-6 py-3">
                        {expanded ? "Show less" : `Show all ${projectsData.length} projects`}
                        <FiChevronDown
                            size={16}
                            className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>
            )}

            {selected && (
                <ProjectModal
                    project={selected}
                    icon={pickIcon(selected)}
                    onClose={() => setSelected(null)}
                />
            )}
        </section>
    );
}

export default Projects;
