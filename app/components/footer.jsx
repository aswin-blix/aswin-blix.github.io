// @flow strict
import Link from "next/link";
import { personalData } from "@/utils/data/personal-data";
import { BsGithub, BsLinkedin, BsTwitter, BsStackOverflow, BsFacebook } from "react-icons/bs";

const SOCIALS = [
    { href: personalData.github, icon: BsGithub, label: "GitHub" },
    { href: personalData.linkedIn, icon: BsLinkedin, label: "LinkedIn" },
    { href: personalData.twitter, icon: BsTwitter, label: "Twitter" },
    { href: personalData.stackOverflow, icon: BsStackOverflow, label: "Stack Overflow" },
    { href: personalData.facebook, icon: BsFacebook, label: "Facebook" },
];

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="nm-surface mt-12 w-full sm:mt-20">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-5 py-8 sm:px-8 sm:py-10 md:flex-row md:justify-between xl:px-10">
                <p className="order-2 text-center text-xs text-nm-muted md:order-1 md:text-left">
                    &copy; {year} — Developed by{" "}
                    <span className="font-semibold text-nm-text">Aswin Blix T.C</span> — Kanniyakumari,
                    India
                </p>

                <div className="order-1 flex items-center gap-3 md:order-2">
                    {SOCIALS.map(({ href, icon: Icon, label }) => (
                        <Link
                            key={label}
                            href={href}
                            target="_blank"
                            aria-label={label}
                            className="nm-icon-btn h-9 w-9"
                        >
                            <Icon size={15} />
                        </Link>
                    ))}
                </div>

                <a href="#" className="nm-btn order-3 gap-1.5 px-4 py-2 text-xs">
                    Back to top &uarr;
                </a>
            </div>
        </footer>
    );
}

export default Footer;
