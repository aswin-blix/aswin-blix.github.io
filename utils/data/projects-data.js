// import ayla from '/public/image/ayla.jpg';
// import crefin from '/public/image/crefin.jpg';
// import realEstate from '/public/image/real-estate.jpg';
// import travel from '/public/image/travel.jpg';

export const projectsData = [
    {
        id: 1,
        name: "Yoode - Custom Merchandise",
        description:
            "I architected and launched the e-commerce platform for Yoode.com, a leading custom apparel brand. I developed custom UI sections by writing specialized Liquid code to extend the theme's functionality beyond its native capabilities. I handled the complete setup, including product catalog management and seamless integrations for Razorpay and WhatsApp. Additionally, I engineered the network layer by managing the domain via AWS Route 53 and provisioning SSL certificates using AWS Certificate Manager (ACM) for secure, high-availability access.",
        tools: [
            "Shopify",
            "Liquid (Shopify)",
            "AWS Route 53",
            "AWS Certificate Manager",
            "Razorpay",
            "WhatsApp API",
            "HTML5",
            "CSS3"
        ],
        role: "Shopify Developer & Cloud Admin",
        code: "",
        demo: "https://www.yoode.com/",
        // image: yoode_preview,
    },
    {
        id: 2,
        name: "NSRL Garments Manufacturing",
        description:
            "I architected and deployed a comprehensive Odoo-based ERP and e-commerce solution for NSRL Garments. Beyond the Odoo implementation, I designed a robust AWS infrastructure using Route 53 for domain management and AWS Certificate Manager (ACM) for secure SSL provisioning. I configured an AWS CloudFront distribution to serve as a high-performance CDN and reverse proxy, ensuring fast global content delivery and secure SSL termination for the platform.",
        tools: [
            "Odoo 17",
            "AWS Route 53",
            "AWS CloudFront",
            "AWS Certificate Manager",
            "Python",
            "PostgreSQL",
            "Razorpay",
            "WhatsApp API",
            "Odoo Website",
            "Odoo Sales"
        ],
        role: "Odoo & Cloud Infrastructure Specialist",
        code: "",
        demo: "https://www.nsrlgarments.com/",
        // image: nsrl_garments,
    },
    {
        id: 3,
        name: "Yoode Shopify Partner Portal",
        description:
            "I have designed and developed a full-stack partner portal for Yoode to streamline Shopify store integrations. I created the responsive interactions using Vue.js embedded within Laravel Blade, styled with a combination of Bootstrap, Tailwind CSS, and the Tabler UI kit. The app features a dynamic dashboard with real-time statistics for users, orders, and revenue. I developed the robust backend API using Laravel and MySQL, implementing secure authentication and efficient data handling. I optimized the frontend build process using Vite.",
        tools: [
            "Laravel",
            "Vue.js",
            "MySQL",
            "Bootstrap",
            "Tailwind CSS",
            "Vite",
            "Tabler",
            "Sass/SCSS",
            "FontAwesome",
        ],
        role: "Full Stack Developer",
        code: "",
        demo: "",
        // image: yoode_portal,
    },
    {
        id: 4,
        name: "NSRL Odoo API Integration",
        description:
            "I designed and developed a robust middleware application to synchronize data between Odoo ERP and a local SQL Server. I created the modern dashboard UI using Vue.js 3, Tailwind CSS, and Vite for managing Sales Orders and Customers. I developed the backend API using Laravel 12 and PHP 8.2, implementing a custom JSON-RPC client for Odoo communication. The system features incremental data synchronization using Laravel Queues and handles file attachments efficiently.",
        tools: [
            "Laravel",
            "Vue.js",
            "Tailwind CSS",
            "SQL Server",
            "Odoo API",
            "PHP",
            "Vite",
            "Axios",
            "Laravel Queues",
        ],
        role: "Full Stack Developer",
        code: "",
        demo: "",
        // image: nsrl_odoo,
    },
    {
        id: 5,
        name: "Yoode Medusa Storefront",
        description: "I have designed and developed a high-performance e-commerce storefront for Yoode using Next.js 16 and Medusa V2. The application features a custom, responsive UI built with Tailwind CSS, including a dynamic product browsing experience with advanced filtering and sorting. Key features include a real-time shopping cart (drawer and full page), a multi-step checkout process, and a comprehensive customer account system with registration, login, and order history dashboard. I enhanced the backend functionality by implementing custom scripts for inventory management and option sorting, ensuring seamless data integrity.",
        tools: [
            "Next.js 16",
            "Medusa V2",
            "TypeScript",
            "Tailwind CSS",
            "Lucide React",
            "Sonner (Toasts)",
            "Medusa JS SDK",
            "Node.js"
        ],
        role: "Full Stack Developer",
        code: "",
        demo: ""
    },
    {
        id: 6,
        name: "Yoode - Headless Custom Apparel Store",
        description: "I developed a premium headless e-commerce platform for Yoode using Shopify Hydrogen and Remix. The application features a highly immersive, animated home page built with GSAP (ScrollTrigger, Magnetic Buttons, Parallax) and Tailwind CSS v4. It includes a custom 'Design Studio' that allows users to personalize apparel in real-time. The project leverages the Shopify Storefront API for inventory management and Checkout, optimized for high performance and SEO using Server-Side Rendering (SSR).",
        tools: [
            "Shopify Hydrogen",
            "Remix",
            "React",
            "Tailwind CSS",
            "GSAP",
            "Fabric.js",
            "GraphQL",
            "Vite",
            "Oxygen"
        ],
        role: "Full Stack Developer",
        code: "",
        demo: ""
    },
    {
        id: 7,
        name: "Speedify v2 - Network Speed Monitor",
        description:
            "I designed and developed Speedify v2, a lightweight Windows desktop utility that displays real-time network speeds in a borderless, pill-shaped always-on-top overlay. Built with Python and Tkinter, it features a dark glassmorphism UI with chroma-key transparency and dynamic color intensification based on connection speed. The app uses an 8-sample sliding window for accurate speed averaging with automatic unit conversion between KB/s, Mbps, and Gbps. Persistent window positioning is handled via JSON config stored in AppData, and daemon threading ensures a non-blocking, responsive experience with minimal CPU and memory footprint.",
        tools: [
            "Python",
            "Tkinter",
            "psutil",
            "PyInstaller",
            "Threading",
            "Glassmorphism UI",
        ],
        role: "Python Developer",
        code: "https://github.com/aswin-blix/speedify2",
        demo: "",
        // image: speedify,
    },
    {
        id: 8,
        name: "Trackify - Personal Finance Manager",
        description:
            "I built Trackify, a personal finance management mobile application using Flutter and Dart. The app features a dashboard showing total balance, monthly spending, and income overview, along with full transaction management including swipe-to-delete. I implemented visual spending analytics using donut charts categorized by expense type and six-month income vs. expense comparison charts using the fl_chart library. The app includes intelligent spending recommendations based on user patterns, custom category creation with icon and color selection, dark/light theme support, and offline-first local data storage via SQLite — all without requiring user accounts.",
        tools: [
            "Flutter",
            "Dart",
            "Provider",
            "SQLite",
            "sqflite",
            "fl_chart",
            "Google Fonts",
            "SharedPreferences",
        ],
        role: "Flutter Developer",
        code: "https://github.com/aswin-blix/trackify",
        demo: "",
    },
    {
        id: 9,
        name: "NSRL Garments Stats",
        description: "A full-stack web application for tracking and analyzing garment manufacturing statistics. I developed the backend using Laravel (PHP) and the frontend with Vue.js, Tailwind CSS, and Bootstrap, incorporating GSAP for animations. The application is deployed on AWS Elastic Beanstalk with a secure custom subdomain configuration using AWS CloudFront and ACM certificates.",
        tools: [
            "Laravel",
            "Vue.js",
            "Tailwind CSS",
            "Bootstrap",
            "GSAP",
            "MySQL",
            "AWS Elastic Beanstalk",
            "AWS CloudFront",
            "AWS Certificate Manager"
        ],
        role: "Full Stack Developer",
        code: "",
        demo: "",
        // image: nsrl_stats,
    },
    {
        id: 10,
        name: "HR Management System",
        description: "Developed a Desktop and Web Application in C# to manage employee information, facilitating interaction between employees and administration.",
        tools: ["C#", ".NET", "SQL Server", "Desktop App"],
        role: "Software Engineer",
        code: "",
        demo: "",
    },
    {
        id: 11,
        name: "Smart Manage",
        description: "Created an apartment management system website to streamline operations for apartment owners. Ensuring easy management of daily tasks.",
        tools: ["Web Development", "HTML", "CSS", "PHP"],
        role: "Web Developer",
        code: "",
        demo: "",
    },
    {
        id: 12,
        name: "Customer Care Management",
        description: "Built a .NET application featuring service based on customer input, direct online communication, and feedback management.",
        tools: [".NET", "C#", "SQL Server"],
        role: ".NET Developer",
        code: "",
        demo: "",
    },
    {
        id: 13,
        name: "Whiteoval.in Website",
        description: "Whiteoval.in is a static website, which is created for Whiteoval technologies Pvt Ltd. The main aim of the website is to boost sales.",
        tools: ["HTML", "CSS", "JavaScript", "Static Site"],
        role: "Web Developer",
        code: "",
        demo: "http://whiteoval.in",
    }
];

// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
//     image: crefin,
// },
