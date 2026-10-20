/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // Values live in app/css/globals.scss; these only map names -> vars.
            colors: {
                nm: {
                    bg: "var(--nm-bg)",
                    text: "var(--nm-text)",
                    muted: "var(--nm-text-muted)",
                    faint: "var(--nm-text-faint)",
                    scrim: "var(--nm-scrim)",
                },
            },
            boxShadow: {
                "nm-raised": "var(--nm-raised)",
                "nm-raised-sm": "var(--nm-raised-sm)",
                "nm-raised-lg": "var(--nm-raised-lg)",
                "nm-inset": "var(--nm-inset)",
                "nm-inset-sm": "var(--nm-inset-sm)",
                "nm-elevated": "var(--nm-elevated)",
            },
            fontFamily: {
                mono: ["var(--font-mono)", "monospace"],
            },
            // Keep every readable Tailwind text tier at 16px or above.
            // Print-specific resume sizing is handled separately in resume-print.scss.
            fontSize: {
                xs: ["1rem", { lineHeight: "1.5rem" }],
                sm: ["1rem", { lineHeight: "1.5rem" }],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "3rem",
                    xl: "4rem",
                    "2xl": "4rem",
                    "3xl": "5rem",
                },
            },
            screens: {
                "4k": "1980px",
            },
        },
    },
    plugins: [],
};
