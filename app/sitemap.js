export default function sitemap() {
    return [
        {
            url: "https://aswinblix.dev",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1,
        },
        {
            url: "https://aswinblix.dev/resume",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
    ];
}
