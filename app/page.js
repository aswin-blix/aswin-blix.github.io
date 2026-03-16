import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

async function getData() {
    try {
        const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

        if (!res.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await res.json();

        const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

        return filtered;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

const jsonLd = [
    {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        dateCreated: "2021-01-01T00:00:00Z",
        dateModified: new Date().toISOString(),
        mainEntity: {
            "@type": "Person",
            "@id": "https://aswin-blix.github.io/#person",
            name: "Aswin Blix T.C",
            url: "https://aswin-blix.github.io",
            image: "https://aswin-blix.github.io/image/my-profile.jpg",
            jobTitle: "AI-Native Full Stack Engineer",
            description:
                "Passionate programmer dedicated to building clean, modern web experiences. AI-Assisted Developer proficient in JavaScript, React, Next.js, Laravel, Vue.js, Python, Shopify, Odoo, and AWS.",
            email: "aswinasvin13@gmail.com",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Kanniyakumari",
                addressRegion: "Tamil Nadu",
                postalCode: "629168",
                addressCountry: "IN",
            },
            sameAs: [
                "https://github.com/aswin-blix",
                "https://www.linkedin.com/in/aswin-blix/",
                "https://twitter.com/aswinblix",
                "https://www.facebook.com/aswinblix/",
                "https://stackoverflow.com/users/16927414/aswin-blix",
            ],
            knowsAbout: [
                "JavaScript",
                "React",
                "Next.js",
                "Laravel",
                "Vue.js",
                "Python",
                "PHP",
                "AWS",
                "Shopify",
                "Odoo",
                "MySQL",
                "Tailwind CSS",
                "GSAP",
            ],
            worksFor: {
                "@type": "Organization",
                name: "BitsNPixs Technologies",
            },
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://aswin-blix.github.io/#website",
        url: "https://aswin-blix.github.io",
        name: "Aswin Blix Portfolio",
        description: "Portfolio of Aswin Blix T.C — AI-Native Full Stack Engineer",
        author: {
            "@id": "https://aswin-blix.github.io/#person",
        },
    },
];

export default async function Home() {
    const blogs = await getData();

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection />
            <AboutSection />
            <Experience />
            <Skills />
            <Projects />
            <Education />
            {/* <Blog blogs={blogs} /> */}
            <ContactSection />
        </>
    );
}
