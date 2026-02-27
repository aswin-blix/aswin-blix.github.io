"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-[#0d1224]/70 backdrop-blur-md sticky top-0 z-50">
            <div className="flex items-center justify-between py-5">
                <div className="flex flex-shrink-0 items-center">
                    <Link href="/" className="flex items-center">
                        <Image
                            src={(process.env.NEXT_PUBLIC_BASE_PATH || "") + "/logo.png"}
                            alt="Aswin Blix Logo"
                            width={100}
                            height={32}
                            className="h-auto"
                        />
                    </Link>
                </div>

                <button
                    className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
                </button>

                <ul
                    className={`flex flex-col md:flex-row items-start md:items-center text-sm md:space-x-1 md:border-0 absolute md:static top-full left-0 right-0 bg-[#0d1224]/95 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-4 md:p-0 transition-all duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible md:opacity-100 md:visible"}`}
                    id="navbar-default"
                >
                    <li>
                        <a
                            className="block px-4 py-2 no-underline outline-none hover:no-underline"
                            href="#about"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                                ABOUT
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            className="block px-4 py-2 no-underline outline-none hover:no-underline"
                            href="#experience"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                                EXPERIENCE
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            className="block px-4 py-2 no-underline outline-none hover:no-underline"
                            href="#skills"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                                SKILLS
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            className="block px-4 py-2 no-underline outline-none hover:no-underline"
                            href="#education"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                                EDUCATION
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            className="block px-4 py-2 no-underline outline-none hover:no-underline"
                            href="#projects"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                                PROJECTS
                            </div>
                        </a>
                    </li>
                    <li>
                        <a
                            className="block px-4 py-2 no-underline outline-none hover:no-underline"
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">
                                CONTACT
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
