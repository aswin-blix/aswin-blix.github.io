import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./css/card.scss";
import "./css/globals.scss";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    metadataBase: new URL("https://aswin-blix.github.io"),
    title: {
        default: "Aswin Blix T.C — AI-Native Full Stack Engineer",
        template: "%s | Aswin Blix",
    },
    description:
        "Portfolio of Aswin Blix T.C — AI-Native Full Stack Engineer with 4+ years of experience building clean, modern web solutions using React, Next.js, Laravel, Vue.js, Python, Shopify, Odoo, and AWS.",
    keywords: [
        "Aswin Blix",
        "Full Stack Developer",
        "AI-Native Engineer",
        "React Developer",
        "Next.js Developer",
        "Laravel Developer",
        "Vue.js Developer",
        "Python Developer",
        "Shopify Developer",
        "Odoo Developer",
        "AWS",
        "Portfolio",
        "India",
        "Kanniyakumari",
        "Tamil Nadu",
    ],
    authors: [{ name: "Aswin Blix T.C", url: "https://aswin-blix.github.io" }],
    creator: "Aswin Blix T.C",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://aswin-blix.github.io",
        siteName: "Aswin Blix Portfolio",
        title: "Aswin Blix T.C — AI-Native Full Stack Engineer",
        description:
            "Portfolio of Aswin Blix T.C — AI-Native Full Stack Engineer with 4+ years of experience building clean, modern web solutions using React, Next.js, Laravel, Vue.js, Python, Shopify, Odoo, and AWS.",
        images: [
            {
                url: "/card.png",
                width: 1200,
                height: 630,
                alt: "Aswin Blix T.C — AI-Native Full Stack Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aswin Blix T.C — AI-Native Full Stack Engineer",
        description:
            "Portfolio of Aswin Blix T.C — AI-Native Full Stack Engineer with 4+ years of experience building clean, modern web solutions using React, Next.js, Laravel, Vue.js, Python, Shopify, Odoo, and AWS.",
        creator: "@aswinblix",
        images: ["/card.png"],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    alternates: {
        canonical: "https://aswin-blix.github.io",
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
    },
    manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
                    <Navbar />
                    {children}
                </main>
                <Footer />
            </body>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
        </html>
    );
}
