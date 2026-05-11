"use client";

import { personalData } from "@/utils/data/personal-data";
import { experiences } from "@/utils/data/experience";
import { educations } from "@/utils/data/educations";
import { skillsData } from "@/utils/data/skills";
import { projectsData } from "@/utils/data/projects-data";
import Link from "next/link";
import { MdDownload } from "react-icons/md";
import { IoArrowBack } from "react-icons/io5";
import { BsGithub, BsLinkedin, BsEnvelopeFill, BsBoxArrowUpRight } from "react-icons/bs";
import { FaPhone, FaMapMarkerAlt, FaStackOverflow } from "react-icons/fa";

export default function ResumePage() {
    const handleDownload = () => {
        window.print();
    };

    return (
        <>
            <style>{`
                @media print {
                    @page {
                        size: A4;
                        margin: 0.4in;
                    }

                    nav, footer, .no-print {
                        display: none !important;
                    }

                    html, body {
                        background: #fff !important;
                        color: #111 !important;
                        font-size: 8.5pt !important;
                    }

                    main {
                        max-width: 100% !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: #fff !important;
                    }

                    .resume-wrapper { padding: 0 !important; margin: 0 !important; }

                    .resume-card {
                        box-shadow: none !important;
                        border: none !important;
                        border-radius: 0 !important;
                        background: #fff !important;
                        color: #111 !important;
                        max-width: 100% !important;
                    }

                    /* Header — keep dark bg */
                    .resume-header {
                        background: #1e1b4b !important;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                        padding: 14px 20px !important;
                    }

                    .resume-header h1 { font-size: 18pt !important; }
                    .resume-header p   { font-size: 9pt  !important; }
                    .resume-header .header-contact,
                    .resume-header .header-links  { font-size: 7.5pt !important; gap: 4px !important; }

                    /* Body spacing */
                    .resume-body { padding: 14px 20px !important; gap: 0 !important; }
                    .resume-body > .space-y-8 > * + * { margin-top: 10px !important; }

                    /* Section labels */
                    .section-label {
                        color: #6d28d9 !important;
                        font-size: 7pt !important;
                        margin-bottom: 3px !important;
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }
                    .section-divider { border-color: #d1d5db !important; padding-top: 5px !important; }

                    /* Summary */
                    .summary-text { font-size: 7.5pt !important; line-height: 1.5 !important; color: #374151 !important; }

                    /* Experience */
                    .exp-list     { gap: 5px !important; }
                    .exp-item     { gap: 8px !important; }
                    .exp-title    { font-size: 8pt !important; color: #111 !important; }
                    .exp-meta     { font-size: 6.5pt !important; color: #6b7280 !important; margin-top: 0 !important; }
                    .exp-dot {
                        print-color-adjust: exact;
                        -webkit-print-color-adjust: exact;
                    }

                    /* Projects — 2-col grid, descriptions visible */
                    .projects-grid {
                        display: grid !important;
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 6px !important;
                    }

                    .project-card {
                        border: 1px solid #e5e7eb !important;
                        background: #f9fafb !important;
                        border-radius: 5px !important;
                        padding: 6px 8px !important;
                        break-inside: avoid !important;
                        page-break-inside: avoid !important;
                    }

                    .project-name        { font-size: 7.5pt !important; color: #111 !important; }
                    .project-role-badge  {
                        background: #dbeafe !important; color: #1d4ed8 !important;
                        font-size: 6pt !important; padding: 0 5px !important;
                        print-color-adjust: exact; -webkit-print-color-adjust: exact;
                    }
                    .project-description { font-size: 6.5pt !important; color: #374151 !important; line-height: 1.4 !important; margin-bottom: 4px !important; }
                    .project-links       { font-size: 6pt !important; }

                    .tool-chip {
                        background: #ede9fe !important; color: #4c1d95 !important;
                        border-color: #c4b5fd !important; font-size: 5.5pt !important;
                        padding: 0 4px !important;
                        print-color-adjust: exact; -webkit-print-color-adjust: exact;
                    }
                    .tools-wrap { gap: 2px !important; }

                    /* Skills + Education */
                    .bottom-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }

                    .skill-chip {
                        background: #e5e7eb !important; color: #111 !important;
                        border-color: #d1d5db !important; font-size: 6pt !important;
                        padding: 1px 6px !important;
                        print-color-adjust: exact; -webkit-print-color-adjust: exact;
                    }
                    .skills-wrap { gap: 3px !important; }

                    .edu-list  { gap: 5px !important; }
                    .edu-title { font-size: 7.5pt !important; color: #111 !important; }
                    .edu-meta  { font-size: 6.5pt !important; color: #6b7280 !important; margin-top: 0 !important; }
                    .edu-dot   { print-color-adjust: exact; -webkit-print-color-adjust: exact; }

                    .gradient-line { display: none !important; }

                    a { color: #4f46e5 !important; text-decoration: none !important; }
                }
            `}</style>

            <div className="resume-wrapper py-6 lg:py-10">
                {/* Action bar */}
                <div className="no-print flex items-center justify-between mb-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors duration-200"
                    >
                        <IoArrowBack size={18} />
                        Back to Portfolio
                    </Link>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-violet-600 hover:to-pink-500 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-violet-900/40"
                    >
                        <MdDownload size={18} />
                        Download PDF
                    </button>
                </div>

                {/* Resume card */}
                <div className="resume-card bg-[#0d1224] border border-[#1b2c68a0] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 max-w-4xl mx-auto">

                    {/* Top gradient line */}
                    <div className="gradient-line flex h-[3px]">
                        <div className="flex-1 bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                        <div className="flex-1 bg-gradient-to-r from-violet-600 to-transparent"></div>
                    </div>

                    {/* Header */}
                    <div className="resume-header bg-gradient-to-br from-[#0d1224] to-[#0a0d37] px-8 py-10 border-b border-[#1b2c68a0]">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                            <div>
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                                    {personalData.name}
                                </h1>
                                <p className="mt-1.5 text-base font-semibold text-[#16f2b3]">
                                    {personalData.designation}
                                </p>

                                <div className="header-contact mt-5 flex flex-col gap-2 text-sm text-gray-300">
                                    <a
                                        href={`mailto:${personalData.email}`}
                                        className="flex items-center gap-2 hover:text-pink-400 transition-colors"
                                    >
                                        <BsEnvelopeFill size={13} className="text-pink-500 shrink-0" />
                                        {personalData.email}
                                    </a>
                                    <span className="flex items-center gap-2">
                                        <FaPhone size={12} className="text-pink-500 shrink-0" />
                                        {personalData.phone}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FaMapMarkerAlt size={13} className="text-pink-500 shrink-0" />
                                        {personalData.address}
                                    </span>
                                </div>
                            </div>

                            <div className="header-links flex flex-row md:flex-col gap-3 text-sm">
                                <a
                                    href={personalData.github}
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <BsGithub size={15} className="text-pink-500 shrink-0" />
                                    <span>github.com/aswin-blix</span>
                                </a>
                                <a
                                    href={personalData.linkedIn}
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <BsLinkedin size={15} className="text-pink-500 shrink-0" />
                                    <span>linkedin.com/in/aswin-blix</span>
                                </a>
                                <a
                                    href={personalData.stackOverflow}
                                    target="_blank"
                                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                                >
                                    <FaStackOverflow size={15} className="text-pink-500 shrink-0" />
                                    <span>stackoverflow.com/u/16927414</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="resume-body px-8 py-8 space-y-8">

                        {/* Summary */}
                        <section>
                            <h2 className="section-label text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3">
                                Professional Summary
                            </h2>
                            <div className="section-divider border-t border-[#1b2c68a0] pt-4">
                                <p className="summary-text text-gray-300 text-sm leading-relaxed">
                                    {personalData.description}
                                </p>
                            </div>
                        </section>

                        {/* Experience */}
                        <section>
                            <h2 className="section-label text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3">
                                Experience
                            </h2>
                            <div className="section-divider border-t border-[#1b2c68a0] pt-4">
                                <div className="exp-list space-y-5">
                                    {experiences.map((exp) => (
                                        <div key={exp.id} className="exp-item flex gap-4">
                                            <div className="mt-1.5 shrink-0">
                                                <div className="exp-dot w-2.5 h-2.5 rounded-full bg-gradient-to-br from-pink-500 to-violet-600"></div>
                                            </div>
                                            <div>
                                                <p className="exp-title text-white font-semibold text-sm">{exp.title}</p>
                                                <p className="exp-meta text-gray-400 text-xs mt-0.5">
                                                    {exp.company}
                                                    <span className="ml-2 text-gray-500">{exp.duration}</span>
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Projects */}
                        <section>
                            <h2 className="section-label text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3">
                                Projects
                            </h2>
                            <div className="section-divider border-t border-[#1b2c68a0] pt-4">
                                <div className="projects-grid space-y-4">
                                    {projectsData.map((project) => (
                                        <div key={project.id} className="project-card rounded-xl border border-[#1b2c68a0] bg-[#0a0d37]/50 p-4">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                                <div className="flex items-start gap-2 flex-wrap">
                                                    <h3 className="project-name text-white font-semibold text-sm">
                                                        {project.name}
                                                    </h3>
                                                    <span className="project-role-badge text-[10px] font-semibold px-2 py-0.5 rounded-full bg-violet-900/60 text-violet-300 border border-violet-700/40 whitespace-nowrap">
                                                        {project.role}
                                                    </span>
                                                </div>
                                                <div className="project-links flex items-center gap-3 shrink-0">
                                                    {project.demo && (
                                                        <a href={project.demo} target="_blank" className="flex items-center gap-1 text-[10px] text-[#16f2b3] hover:text-white transition-colors">
                                                            <BsBoxArrowUpRight size={10} />
                                                            Live
                                                        </a>
                                                    )}
                                                    {project.code && (
                                                        <a href={project.code} target="_blank" className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-white transition-colors">
                                                            <BsGithub size={10} />
                                                            Code
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="project-description text-gray-400 text-xs leading-relaxed mb-3">
                                                {project.description}
                                            </p>

                                            <div className="tools-wrap flex flex-wrap gap-1.5">
                                                {project.tools.map((tool) => (
                                                    <span key={tool} className="tool-chip text-[10px] px-2 py-0.5 rounded-full bg-violet-900/40 text-violet-300 border border-violet-700/30">
                                                        {tool}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Skills + Education side-by-side */}
                        <div className="bottom-grid grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Skills */}
                            <section>
                                <h2 className="section-label text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3">
                                    Skills
                                </h2>
                                <div className="section-divider border-t border-[#1b2c68a0] pt-4">
                                    <div className="skills-wrap flex flex-wrap gap-2">
                                        {skillsData.map((skill) => (
                                            <span key={skill} className="skill-chip text-xs px-3 py-1 rounded-full bg-[#1b2c68]/60 text-gray-200 border border-[#1b2c68a0]">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="section-label text-xs font-bold uppercase tracking-[0.2em] text-violet-400 mb-3">
                                    Education
                                </h2>
                                <div className="section-divider border-t border-[#1b2c68a0] pt-4">
                                    <div className="edu-list space-y-4">
                                        {educations.map((edu) => (
                                            <div key={edu.id} className="flex gap-3">
                                                <div className="mt-1.5 shrink-0">
                                                    <div className="edu-dot w-2 h-2 rounded-full bg-[#16f2b3]"></div>
                                                </div>
                                                <div>
                                                    <p className="edu-title text-white font-semibold text-sm">{edu.title}</p>
                                                    <p className="edu-meta text-gray-400 text-xs mt-0.5">{edu.institution}</p>
                                                    <p className="edu-meta text-gray-500 text-xs">{edu.duration}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>

                    </div>

                    {/* Bottom gradient line */}
                    <div className="gradient-line flex h-[2px]">
                        <div className="flex-1 bg-gradient-to-r from-transparent via-violet-600 to-pink-500"></div>
                        <div className="flex-1 bg-gradient-to-r from-pink-500 to-transparent"></div>
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="no-print flex justify-center mt-8">
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-violet-600 hover:from-violet-600 hover:to-pink-500 text-white text-sm font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-violet-900/40"
                    >
                        <MdDownload size={18} />
                        Save as PDF
                    </button>
                </div>
            </div>
        </>
    );
}
