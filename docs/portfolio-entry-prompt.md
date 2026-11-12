# Portfolio entry prompt

Give this prompt to a coding agent at the root of any project to get back an entry that can be pasted into `utils/data/projects-data.js`. When it returns, follow the "Adding projects" checklist in `CLAUDE.md`.

---

````markdown
You are documenting this project so it can be added to my freelance developer portfolio. Investigate the codebase thoroughly, then return a portfolio entry. Do not modify any project files.

## How to investigate
1. Read the README, package/dependency files (package.json, composer.json, requirements.txt, pubspec.yaml, shopify.app.toml, wrangler.toml, Dockerfile, etc.), config, and CI/deploy workflows.
2. Scan the source to understand what the product actually does: main features, user roles, integrations (APIs, webhooks, payments, auth), data storage, background jobs, and how it is deployed.
3. Check git history (`git log --oneline | head -50`, `git shortlog -sn`) to judge the scope of my contribution and the timeline (first and last commit dates).
4. Look for engineering quality signals: tests, type safety, linting, CI, migrations, monitoring, health checks, runbooks, rollback plans, performance work, accessibility, SEO.

## Rules
- **Evidence only.** Every claim must be backed by something in the repo. Don't invent metrics, client names, user counts, or results. If something is unknown, say "unknown". Don't guess.
- **Confidentiality.** Never include secrets, API keys, internal URLs, customer data, or private business details. Use the client or brand name only if it appears in public-facing code (storefront, public domain). Otherwise describe the business generically (e.g. "a fashion retailer").
- **Buyer-focused writing.** The audience is a business deciding whether to hire me. Lead with the business problem and the outcome, then the technical depth. Write in first person ("I built…") and avoid hype words.
- Use the official spelling for each technology (e.g. "Next JS", "Node JS", "Typescript", "Liquid", "Shopify CLI", "Admin GraphQL API", "Cloudflare Workers").
- Public URLs on my own site must use `https://aswinblix.dev/...`, never `aswin-blix.github.io`.

## Output format
Return exactly these sections.

### 1. Portfolio entry (JavaScript object)
```js
{
    id: 0, // leave as 0, I will assign it
    name: "<Product name - short descriptor, e.g. 'Yoode Invoice - Custom Shopify App'>",
    description:
        "<3–4 sentences, about 60–90 words. First person. What I built, for what kind of business, the key workflows, and how it ships/runs.>",
    highlights: [
        "<Concrete capability or engineering strength, max ~12 words>",
        "<...>",
        "<...>",
    ], // exactly 3
    tools: ["<4–7 most significant technologies, most important first>"],
    role: "<e.g. Shopify Theme Developer | Shopify App Developer | Full-Stack Engineer>",
    status: "<e.g. Private client work | Private production app | Live | Open source | In development>",
    featured: false, // true only if this is substantial, production-grade work
    code: "<public repo URL, or empty string if private>",
    demo: "<public live URL, or empty string>",
}
```

### 2. Category
Pick one: Shopify Theme | Shopify App | Headless Commerce | Full-Stack Business System | Cloud / DevOps | Mobile App | Other. Explain your choice in one line.

### 3. New skills
List the technologies used in this project, each spelled the way it should appear in a skills list. Mark each one as **core** (used substantially) or **minor**.

### 4. Evidence summary
Bullet list mapping each claim in the entry to the files or commits that support it.

### 5. Timeline and contribution
First and last commit dates, rough commit count, and whether I appear to be the sole or main contributor.

### 6. Optional extras (only if supported by evidence)
- Measurable results found in the repo (performance scores, test counts, number of integrations or workflows)
- Suggested screenshots to capture (which pages or screens best show the work)
- A one-line hook for a case-study card

### 7. Gaps
Anything I should confirm or add manually before publishing (unclear client permission, missing demo link, unknown outcomes).
````
