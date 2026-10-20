import { GoogleTagManager } from "@next/third-parties/google";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollProgress from "./components/scroll-progress";
import { ThemeProvider } from "./components/theme-provider";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
});

export const metadata = {
    metadataBase: new URL("https://aswin-blix.github.io"),
    title: {
        default: "Aswin Blix — Freelance Shopify & Full-Stack Developer",
        template: "%s | Aswin Blix",
    },
    description:
        "Freelance Shopify and full-stack developer building custom themes, private apps, headless storefronts, business systems, integrations, and AWS delivery.",
    keywords: [
        "Aswin Blix",
        "Full Stack Developer",
        "Freelance Shopify Developer",
        "Shopify Theme Developer",
        "Shopify App Developer",
        "Shopify Liquid Developer",
        "Headless Commerce Developer",
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
        title: "Aswin Blix — Freelance Shopify & Full-Stack Developer",
        description:
            "Custom Shopify themes, private apps, headless commerce, business systems, integrations, and AWS delivery for remote clients.",
        images: [
            {
                url: "/card.png",
                width: 1200,
                height: 630,
                alt: "Aswin Blix — Freelance Shopify and Full-Stack Developer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Aswin Blix — Freelance Shopify & Full-Stack Developer",
        description:
            "Custom Shopify themes, private apps, headless commerce, business systems, integrations, and AWS delivery for remote clients.",
        site: "@aswinblix",
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
        <html lang="en" suppressHydrationWarning>
            <body
                suppressHydrationWarning
                className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className} nm-surface text-nm-text`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <ToastContainer theme="dark" />
                    <ScrollProgress />
                    <main className="relative mx-auto min-h-screen w-full max-w-[1440px] px-5 sm:px-8 xl:px-10">
                        <Navbar />
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
            <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM} />
        </html>
    );
}
