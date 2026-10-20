import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Services from "./components/homepage/services";
import Skills from "./components/homepage/skills";

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
            alternateName: ["Aswin Blix", "Aswin Blix TC", "Aswin"],
            givenName: "Aswin",
            additionalName: "Blix",
            familyName: "T.C",
            url: "https://aswin-blix.github.io",
            mainEntityOfPage: "https://aswin-blix.github.io",
            image: "https://aswin-blix.github.io/image/my-profile.jpg",
            jobTitle: "Freelance Shopify & Full-Stack Developer",
            nationality: { "@type": "Country", name: "India" },
            telephone: "+91-9488-131-904",
            description:
                "Freelance developer building Shopify themes, custom apps, headless storefronts, business systems, integrations, and AWS delivery.",
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
                "Shopify Liquid",
                "Shopify Apps",
                "Shopify Functions",
                "Headless Commerce",
                "Odoo",
                "MySQL",
                "Tailwind CSS",
                "GSAP",
            ],
            worksFor: {
                "@type": "Organization",
                name: "BitsNPixs Technologies",
            },
            hasOccupation: {
                "@type": "Occupation",
                name: "Freelance Shopify & Full-Stack Developer",
                skills: "Shopify themes, Shopify apps, Liquid, React, Next.js, Vue.js, Laravel, Node.js, AWS, SQL Server, and headless commerce",
            },
            alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Sathyabama University, Chennai",
            },
        },
    },
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "https://aswin-blix.github.io/#website",
        url: "https://aswin-blix.github.io",
        name: "Aswin Blix Portfolio",
        alternateName: ["Aswin Blix", "Aswin Blix T.C"],
        inLanguage: "en",
        description: "Portfolio of Aswin Blix — Freelance Shopify & Full-Stack Developer",
        author: {
            "@id": "https://aswin-blix.github.io/#person",
        },
    },
];

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection />
            <Services />
            <Projects />
            <AboutSection />
            <Experience />
            <Skills />
            <Education />
            <ContactSection />
        </>
    );
}
