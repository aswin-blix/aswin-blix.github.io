"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FiX, FiArrowUpRight, FiGithub } from "react-icons/fi";

export default function ProjectModal({ project, icon: Icon, onClose }) {
    const overlayRef = useRef(null);
    const panelRef = useRef(null);

    // Lock background scroll + close on Escape while open.
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    useGSAP(() => {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" });
        gsap.fromTo(
            panelRef.current,
            { opacity: 0, y: 26, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "power3.out" }
        );
    });

    return (
        <div
            ref={overlayRef}
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} details`}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-nm-scrim p-4 backdrop-blur-sm"
        >
            <div
                ref={panelRef}
                onClick={(e) => e.stopPropagation()}
                className="nm-surface relative max-h-[86vh] w-full max-w-lg overflow-y-auto rounded-[24px] p-6 shadow-nm-elevated sm:p-8"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="nm-icon-btn absolute right-4 top-4 h-9 w-9"
                >
                    <FiX size={16} />
                </button>

                <div className="nm-surface flex h-12 w-12 items-center justify-center rounded-2xl text-nm-text shadow-nm-inset">
                    {Icon ? <Icon size={22} /> : null}
                </div>

                <h3 className="mt-4 pr-10 text-xl font-extrabold tracking-tight text-nm-text">
                    {project.name}
                </h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                    <span className="nm-tag inline-block px-3 py-1 text-base text-nm-muted">
                        {project.role}
                    </span>
                    {project.status && (
                        <span className="nm-tag inline-block px-3 py-1 text-base text-nm-muted">
                            {project.status}
                        </span>
                    )}
                </div>

                <p className="mt-5 text-sm leading-[1.7] text-nm-muted">{project.description}</p>

                {project.highlights?.length > 0 && (
                    <>
                        <div className="mb-3 mt-6 flex items-center gap-4">
                            <span className="nm-label">What I Delivered</span>
                            <span className="nm-rule" />
                        </div>
                        <ul className="space-y-3">
                            {project.highlights.map((highlight) => (
                                <li
                                    key={highlight}
                                    className="flex gap-3 text-xs leading-5 text-nm-muted"
                                >
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-nm-text" />
                                    <span>{highlight}</span>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                <div className="mt-6 mb-3 flex items-center gap-4">
                    <span className="nm-label">Tech Stack</span>
                    <span className="nm-rule" />
                </div>
                <div className="flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                        <span key={tool} className="nm-tag px-3 py-1 text-base">
                            {tool}
                        </span>
                    ))}
                </div>

                {(project.demo || project.code) && (
                    <div className="mt-7 flex flex-wrap gap-3">
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noreferrer"
                                className="nm-btn-primary"
                            >
                                Live Demo <FiArrowUpRight size={15} />
                            </a>
                        )}
                        {project.code && (
                            <a
                                href={project.code}
                                target="_blank"
                                rel="noreferrer"
                                className="nm-btn"
                            >
                                View Code <FiGithub size={15} />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
