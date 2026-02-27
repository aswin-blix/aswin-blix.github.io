"use client";

import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
import { useRef } from "react";

gsap.registerPlugin(ScrambleTextPlugin);

function HeroSection() {
    const containerRef = useRef(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            // Use fromTo to ensure proper initial and final states
            tl.fromTo(
                ".hero-text-element",
                { x: -50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" }
            )
                .from(
                    ".hero-scramble",
                    {
                        duration: 1.5,
                        scrambleText: {
                            chars: "lowercase",
                            speed: 0.3,
                        },
                        stagger: 0.2,
                    },
                    "-=0.8"
                )
                .fromTo(
                    ".hero-social-link",
                    { y: 20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.7)" },
                    "-=0.5"
                )
                .fromTo(
                    ".hero-btn",
                    { scale: 0.5, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.2,
                        ease: "elastic.out(1, 0.3)",
                    },
                    "-=0.3"
                )
                .fromTo(
                    ".hero-code",
                    { x: 50, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
                    "-=1.5"
                );
        },
        { scope: containerRef }
    );

    return (
        <section
            ref={containerRef}
            className="relative flex flex-col items-center justify-between py-4 lg:py-12"
        >
            <Image
                src={(process.env.NEXT_PUBLIC_BASE_PATH || "") + "/hero.svg"}
                alt="Hero svg"
                width={1572}
                height={795}
                className="absolute -top-[98px] -z-10"
                priority
            />

            <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
                <div className="order-1 flex flex-col items-start justify-center p-2 pb-10 lg:pt-10">
                    <h1 className="hero-text-element text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
                        Hello, I&apos;m <br />
                        <span className="hero-scramble text-pink-500">{personalData.name}</span>
                        {` — an `}
                        <span className="hero-scramble text-[#16f2b3]">
                            {personalData.designation}
                        </span>
                        .
                    </h1>

                    <div className="my-12 flex items-center gap-5">
                        <Link
                            href={personalData.github}
                            target="_blank"
                            className="hero-social-link transition-all text-pink-500 hover:scale-125 duration-300"
                        >
                            <BsGithub size={30} />
                        </Link>
                        <Link
                            href={personalData.linkedIn}
                            target="_blank"
                            className="hero-social-link transition-all text-pink-500 hover:scale-125 duration-300"
                        >
                            <BsLinkedin size={30} />
                        </Link>
                        <Link
                            href={personalData.facebook}
                            target="_blank"
                            className="hero-social-link transition-all text-pink-500 hover:scale-125 duration-300"
                        >
                            <FaFacebook size={30} />
                        </Link>
                        <Link
                            href={personalData.twitter}
                            target="_blank"
                            className="hero-social-link transition-all text-pink-500 hover:scale-125 duration-300"
                        >
                            <FaTwitterSquare size={30} />
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="#contact"
                            className="hero-btn bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600"
                        >
                            <span className="px-3 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3">
                                <span>Contact me</span>
                                <RiContactsFill size={16} />
                            </span>
                        </Link>

                        <Link
                            className="hero-btn flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
                            role="button"
                            target="_blank"
                            href={personalData.resume}
                        >
                            <span>Get Resume</span>
                            <MdDownload size={16} />
                        </Link>
                    </div>
                </div>
                <div className="hero-code order-1 lg:order-2 from-[#0d1224] border-[#1b2c68a0] relative rounded-lg border bg-gradient-to-r to-[#0a0d37]">
                    <div className="flex flex-row">
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
                        <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
                    </div>
                    <div className="px-4 lg:px-8 py-5">
                        <div className="flex flex-row space-x-2">
                            <div className="h-3 w-3 rounded-full bg-red-400"></div>
                            <div className="h-3 w-3 rounded-full bg-orange-400"></div>
                            <div className="h-3 w-3 rounded-full bg-green-200"></div>
                        </div>
                    </div>
                    <div className="overflow-hidden border-t-[2px] border-indigo-900 px-4 lg:px-8 py-4 lg:py-8">
                        <code className="font-mono text-xs md:text-sm lg:text-base">
                            <div className="blink">
                                <span className="mr-2 text-pink-500">const</span>
                                <span className="mr-2 text-white">coder</span>
                                <span className="mr-2 text-pink-500">=</span>
                                <span className="text-gray-400">{"{"}</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 mr-2 text-white">name:</span>
                                <span className="text-gray-400">{`'`}</span>
                                <span className="text-amber-300">Aswin Blix</span>
                                <span className="text-gray-400">{`',`}</span>
                            </div>
                            <div className="ml-4 lg:ml-8 mr-2">
                                <span className="text-white">skills:</span>
                                <span className="text-gray-400">{`['`}</span>
                                <span className="text-amber-300">Laravel</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Javascript</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Vue</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">NextJS</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">MedusaJS</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Git</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">React</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">PHP</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Python</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Bootstrap</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Wordpress</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Shopify</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Odoo</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">SASS</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Tailwind</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">GitHub</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">AWS</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">Ubuntu</span>
                                <span className="text-gray-400">{", '"}</span>
                                <span className="text-amber-300">MySQL</span>
                                <span className="text-gray-400">{"'],"}</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 mr-2 text-white">hardWorker:</span>
                                <span className="text-orange-400">true</span>
                                <span className="text-gray-400">,</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 mr-2 text-white">quickLearner:</span>
                                <span className="text-orange-400">true</span>
                                <span className="text-gray-400">,</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 mr-2 text-white">problemSolver:</span>
                                <span className="text-orange-400">true</span>
                                <span className="text-gray-400">,</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 mr-2 text-white">vibeCoder:</span>
                                <span className="text-orange-400">true</span>
                                <span className="text-gray-400">,</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                                <span className="text-orange-400">function</span>
                                <span className="text-gray-400">{"() {"}</span>
                            </div>
                            <div>
                                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                                <span className="text-gray-400">{`(`}</span>
                            </div>
                            <div>
                                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                                <span className="mr-2 text-white">hardWorker</span>
                                <span className="text-amber-300">&amp;&amp;</span>
                            </div>
                            <div>
                                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                                <span className="mr-2 text-white">problemSolver</span>
                                <span className="text-amber-300">&amp;&amp;</span>
                            </div>
                            <div>
                                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                                <span className="mr-2 text-white">skills.length</span>
                                <span className="mr-2 text-amber-300">&gt;=</span>
                                <span className="text-orange-400">5</span>
                            </div>
                            <div>
                                <span className="ml-8 lg:ml-16 mr-2 text-gray-400">{`);`}</span>
                            </div>
                            <div>
                                <span className="ml-4 lg:ml-8 text-gray-400">{`};`}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">{`};`}</span>
                            </div>
                        </code>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;
