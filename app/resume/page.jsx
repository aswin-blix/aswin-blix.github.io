"use client";

import { personalData } from "@/utils/data/personal-data";
import { experiences } from "@/utils/data/experience";
import { educations } from "@/utils/data/educations";
import { skillsData } from "@/utils/data/skills";
import { projectsData } from "@/utils/data/projects-data";
import { servicesData } from "@/utils/data/services-data";
import Link from "next/link";
import { MdDownload } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { BsGithub, BsLinkedin, BsEnvelopeFill, BsBoxArrowUpRight } from "react-icons/bs";
import { FaPhone, FaMapMarkerAlt, FaStackOverflow } from "react-icons/fa";
import SectionHeading from "../components/helper/section-heading";
import "../css/resume-print.scss";

export default function ResumePage() {
    const handleDownload = () => window.print();
    const selectedProjects = projectsData.filter((project) => project.featured);

    return (
        <div className="resume-wrapper py-6 lg:py-10">
            {/* Action bar */}
            <div className="no-print mb-6 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-nm-muted transition-colors duration-200 hover:text-nm-text"
                >
                    <IoArrowBack size={18} />
                    Back to Portfolio
                </Link>

                <button onClick={handleDownload} className="nm-btn">
                    <MdDownload size={18} />
                    Download PDF
                </button>
            </div>

            {/* Resume card */}
            <div className="resume-card nm-surface mx-auto max-w-4xl overflow-hidden rounded-[24px] shadow-nm-raised-lg">
                {/* Header */}
                <div className="resume-header nm-surface px-6 py-8 shadow-nm-inset-sm sm:px-10 sm:py-10">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="text-3xl font-extrabold tracking-tight text-nm-text lg:text-4xl">
                                {personalData.name}
                            </h1>
                            <p className="mt-1.5 text-base font-semibold text-nm-muted">
                                {personalData.designation}
                            </p>

                            <div className="header-contact mt-5 flex flex-col gap-2 text-sm text-nm-muted">
                                <a
                                    href={`mailto:${personalData.email}`}
                                    className="flex items-center gap-2 transition-colors hover:text-nm-text"
                                >
                                    <BsEnvelopeFill size={13} className="shrink-0 text-nm-text" />
                                    {personalData.email}
                                </a>
                                <span className="flex items-center gap-2">
                                    <FaPhone size={12} className="shrink-0 text-nm-text" />
                                    {personalData.phone}
                                </span>
                                <span className="flex items-center gap-2">
                                    <FaMapMarkerAlt size={13} className="shrink-0 text-nm-text" />
                                    {personalData.address}
                                </span>
                            </div>
                        </div>

                        <div className="header-links flex flex-row gap-3 text-sm md:flex-col">
                            <a
                                href={personalData.github}
                                target="_blank"
                                className="flex items-center gap-2 text-nm-muted transition-colors hover:text-nm-text"
                            >
                                <BsGithub size={15} className="shrink-0 text-nm-text" />
                                <span>github.com/aswin-blix</span>
                            </a>
                            <a
                                href={personalData.linkedIn}
                                target="_blank"
                                className="flex items-center gap-2 text-nm-muted transition-colors hover:text-nm-text"
                            >
                                <BsLinkedin size={15} className="shrink-0 text-nm-text" />
                                <span>linkedin.com/in/aswin-blix</span>
                            </a>
                            <a
                                href={personalData.stackOverflow}
                                target="_blank"
                                className="flex items-center gap-2 text-nm-muted transition-colors hover:text-nm-text"
                            >
                                <FaStackOverflow size={15} className="shrink-0 text-nm-text" />
                                <span>stackoverflow.com/u/16927414</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="resume-body space-y-8 px-6 py-8 sm:px-10">
                    {/* Summary */}
                    <section>
                        <SectionHeading title="Professional Summary" />
                        <p className="summary-text text-sm leading-relaxed text-nm-muted">
                            {personalData.description}
                        </p>
                    </section>

                    <section>
                        <SectionHeading title="Freelance Services" />
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            {servicesData.map((service) => (
                                <div
                                    key={service.id}
                                    className="nm-surface rounded-[14px] p-3 shadow-nm-raised-sm"
                                >
                                    <p className="text-xs font-semibold text-nm-text">
                                        {service.title}
                                    </p>
                                    <p className="mt-1 text-base leading-relaxed text-nm-muted">
                                        {service.summary}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <SectionHeading title="Experience" />
                        <div className="exp-list space-y-5">
                            {experiences.map((exp) => (
                                <div key={exp.id} className="exp-item flex gap-4">
                                    <div className="mt-1.5 shrink-0">
                                        <div className="exp-dot nm-surface h-2.5 w-2.5 rounded-full shadow-nm-raised-sm" />
                                    </div>
                                    <div>
                                        <p className="exp-title text-sm font-semibold text-nm-text">
                                            {exp.title}
                                        </p>
                                        <p className="exp-meta mt-0.5 text-xs text-nm-muted">
                                            {exp.company}
                                            <span className="ml-2 text-nm-faint">{exp.duration}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects */}
                    <section>
                        <SectionHeading title="Projects" />
                        <div className="projects-grid space-y-4">
                            {selectedProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="project-card nm-surface rounded-[16px] p-4 shadow-nm-raised"
                                >
                                    <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="project-name text-sm font-semibold text-nm-text">
                                                {project.name}
                                            </h3>
                                            <span className="project-role-badge nm-tag whitespace-nowrap text-nm-muted">
                                                {project.role}
                                            </span>
                                        </div>
                                        <div className="project-links flex shrink-0 items-center gap-3">
                                            {project.demo && (
                                                <a
                                                    href={project.demo}
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-base text-nm-muted transition-colors hover:text-nm-text"
                                                >
                                                    <BsBoxArrowUpRight size={10} />
                                                    Live
                                                </a>
                                            )}
                                            {project.code && (
                                                <a
                                                    href={project.code}
                                                    target="_blank"
                                                    className="flex items-center gap-1 text-base text-nm-muted transition-colors hover:text-nm-text"
                                                >
                                                    <BsGithub size={10} />
                                                    Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    <p className="project-description mb-3 text-xs leading-relaxed text-nm-muted">
                                        {project.description}
                                    </p>

                                    <div className="tools-wrap flex flex-wrap gap-1.5">
                                        {project.tools.map((tool) => (
                                            <span key={tool} className="tool-chip nm-tag">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Skills + Education */}
                    <div className="bottom-grid grid grid-cols-1 gap-8 md:grid-cols-2">
                        <section>
                            <SectionHeading title="Skills" />
                            <div className="skills-wrap flex flex-wrap gap-2">
                                {skillsData.map((skill) => (
                                    <span key={skill} className="skill-chip nm-chip">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section>
                            <SectionHeading title="Education" />
                            <div className="edu-list space-y-4">
                                {educations.map((edu) => (
                                    <div key={edu.id} className="flex gap-3">
                                        <div className="mt-1.5 shrink-0">
                                            <div className="edu-dot nm-surface h-2 w-2 rounded-full shadow-nm-raised-sm" />
                                        </div>
                                        <div>
                                            <p className="edu-title text-sm font-semibold text-nm-text">
                                                {edu.title}
                                            </p>
                                            <p className="edu-meta mt-0.5 text-xs text-nm-muted">
                                                {edu.institution}
                                            </p>
                                            <p className="edu-meta text-xs text-nm-faint">{edu.duration}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <div className="no-print mt-8 flex justify-center">
                <button onClick={handleDownload} className="nm-btn px-8 py-3">
                    <MdDownload size={18} />
                    Save as PDF
                </button>
            </div>
        </div>
    );
}
