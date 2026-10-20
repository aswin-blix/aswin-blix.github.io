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
} from "react-icons/si";
import { TbBuildingWarehouse } from "react-icons/tb";
import { FiCode, FiArrowUpRight, FiGithub, FiChevronDown } from "react-icons/fi";
import ProjectModal from "./project-modal";
import SectionHeading from "../../helper/section-heading";

gsap.registerPlugin(ScrollTrigger);

const INITIAL_COUNT = 6;

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

function Projects() {
    const containerRef = useRef(null);
    const gridRef = useRef(null);
    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(null);

    const hasMore = projectsData.length > INITIAL_COUNT;
    const visibleProjects = expanded ? projectsData : projectsData.slice(0, INITIAL_COUNT);

    const toggle = () => {
        const next = !expanded;
        setExpanded(next);
        if (next) {
            // Animate newly revealed cards on the next paint.
            requestAnimationFrame(() => {
                const cards = gridRef.current?.querySelectorAll(".project-card");
                if (!cards) return;
                gsap.fromTo(
                    Array.from(cards).slice(INITIAL_COUNT),
                    { opacity: 0, y: 40, rotateX: -16, transformPerspective: 800, transformOrigin: "50% 100%" },
                    { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.06, ease: "power3.out" }
                );
            });
        } else {
            containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    useGSAP(
        () => {
            gsap.fromTo(
                ".project-card",
                { opacity: 0, y: 44, rotateX: -16, transformPerspective: 800, transformOrigin: "50% 100%" },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    scrollTrigger: { trigger: containerRef.current, start: "top 82%" },
                }
            );
        },
        { scope: containerRef }
    );

    const onEnter = (e) =>
        gsap.to(e.currentTarget, { y: -4, boxShadow: "var(--nm-raised-lg)", duration: 0.25 });
    const onLeave = (e) =>
        gsap.to(e.currentTarget, { y: 0, boxShadow: "var(--nm-raised)", duration: 0.25 });

    return (
        <section ref={containerRef} id="projects" className="nm-section">
            <SectionHeading title="Selected Work" />

            <div className="mb-8 max-w-3xl">
                <h2 className="text-2xl font-extrabold tracking-tight text-nm-text sm:text-3xl">
                    Commerce, operations, and production systems built end to end.
                </h2>
                <p className="mt-3 text-sm leading-7 text-nm-muted">
                    Featured projects lead with Shopify theme and app work. Private client systems
                    are clearly labelled where source code and live access cannot be shared.
                </p>
            </div>

            <div ref={gridRef} className="gap-4 sm:columns-2 sm:gap-5 lg:columns-3">
                {visibleProjects.map((project) => {
                    const Icon = pickIcon(project);
                    const link = project.demo || project.code;
                    const tools = project.tools.slice(0, 4);
                    const extra = project.tools.length - tools.length;

                    return (
                        <article
                            key={project.id}
                            onMouseEnter={onEnter}
                            onMouseLeave={onLeave}
                            onClick={() => setSelected(project)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelected(project);
                                }
                            }}
                            role="button"
                            tabIndex={0}
                            aria-label={`View details for ${project.name}`}
                            className="project-card nm-surface group mb-5 flex cursor-pointer break-inside-avoid flex-col gap-3.5 rounded-[20px] p-5 shadow-nm-raised outline-none"
                        >
                            <div className="flex items-start justify-between">
                                <div className="nm-surface flex h-10 w-10 items-center justify-center rounded-xl text-nm-text shadow-nm-inset">
                                    <Icon size={18} />
                                </div>
                                {link && (
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        aria-label={`Open ${project.name}`}
                                        className="text-nm-faint transition-colors duration-200 hover:text-nm-text"
                                    >
                                        {project.demo ? <FiArrowUpRight size={16} /> : <FiGithub size={15} />}
                                    </a>
                                )}
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
                                {extra > 0 && (
                                    <span className="nm-tag px-2 py-0.5">+{extra}</span>
                                )}
                            </div>

                            <span className="mt-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-nm-faint transition-colors duration-200 group-hover:text-nm-text">
                                View details
                                <FiArrowUpRight size={12} />
                            </span>
                        </article>
                    );
                })}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
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
