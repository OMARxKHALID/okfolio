import type { Project, Skill, Testimonial, Category } from "@/types";

export const PORTFOLIO_CONTENT = {
  artist: {
    name: "AROOJ AATIR",
    firstName: "AROOJ",
    lastName: "AATIR",
    logo: "OK",
    tagline: "CREATIVE DESIGNER & ANIMATOR",
    location: "Berlin, Germany",
    availability: "Available Worldwide",
  },
  hero: {
    badge: "CREATIVE DESIGNER & ANIMATOR",
    description:
      "Crafting high-end digital experiences where motion meets strategy. Creative Designer & Animator specializing in creative interaction.",
    cta: "VIEW MY PROJECTS",
  },
  about: {
    badge: "ABOUT AROOJ",
    headline:
      "Design is the silent ambassador of your brand. I make it speak volumes.",
    description:
      "I bridge the gap between complex design and poetic animation. With a decade of experience in the industry, I help brands tell their stories through meaningful interactions and performant, scalable digital experiences.",
  },
  approach: {
    lines: [
      { text: "STRATEGY MEETS", color: "text-cream" },
      { text: "CREATIVE MOTION", color: "text-gold" },
      { text: "ENGINEERED FOR", color: "text-cream" },
      { text: "LASTING IMPACT", color: "text-gold" },
    ],
    description:
      "I believe that every pixel should serve a purpose. My approach combines rigorous technical architecture with experimental design thinking to create interfaces that feel alive.",
  },
  skills: {
    title: "CORE EXPERTISE",
    description:
      "A comprehensive set of skills built over years of crafting digital products for global brands.",
  },
  testimonials: {
    badge: "TESTIMONIALS",
    title: "COLLABORATION",
    parallaxText: "KIND WORDS KIND WORDS",
  },
  footer: {
    ctaLine1: "LET'S START A",
    ctaLine2: "PROJECT TOGETHER",
    contactTitle: "GET IN TOUCH",
    emailPlaceholder: "YOUR EMAIL",
    navigation: {
      title: "NAVIGATION",
      links: [
        { label: "HOME", href: "#" },
        { label: "WORK", href: "#" },
        { label: "ABOUT", href: "#" },
        { label: "SERVICES", href: "#" },
      ],
    },
    location: {
      title: "LOCATION",
    },
    copyright: "© 2025 OMAR KHALID. ALL RIGHTS RESERVED.",
    privacy: "PRIVACY POLICY",
  },
  work: {
    title: "SELECTED WORK",
    badge: "PORTFOLIO",
  },
};

export const PORTFOLIO_INFO = {
  name: PORTFOLIO_CONTENT.artist.name,
  initials: PORTFOLIO_CONTENT.artist.logo,
  role: PORTFOLIO_CONTENT.artist.tagline,
  bio: PORTFOLIO_CONTENT.about.description,
  location: PORTFOLIO_CONTENT.artist.location,
};

export const CATEGORIES: Category[] = [
  {
    slug: "illustrator",
    title: "ILLUSTRATOR",
    description:
      "Vector art, digital illustration, and creative visual storytelling",
    image: "/images/adobe-illustrator-card-file.png",
    rotation: 0,
  },
  {
    slug: "2d-animation",
    title: "2D ANIMATION",
    description:
      "Motion graphics, character animation, and dynamic visual experiences",
    image: "/images/2d-animation.png",
    rotation: 0,
  },
  {
    slug: "packaging-design",
    title: "PACKAGING",
    description:
      "Brand packaging, product design, and tangible creative solutions",
    image: "/images/pakckging-design.png",
    rotation: 0,
  },
  {
    slug: "ui-ux",
    title: "UI / UX",
    description:
      "Interface design, user experience, and digital product design",
    image: "/images/ui-ux-card-file.png",
    rotation: 0,
  },
  {
    slug: "after-effects",
    title: "AFTER EFFECTS",
    description: "Motion design, visual effects, and cinematic compositions",
    image: "/images/after-effect-file.png",
    rotation: 0,
  },
  {
    slug: "photoshop",
    title: "PHOTOSHOP",
    description: "Photo manipulation, digital art, and creative compositing",
    image: "/images/adobe-photoshop-card-file.png",
    rotation: 0,
  },
];

export const PROJECTS: Project[] = [
  {
    title: "LUMINA",
    category: "Brand Identity",
    categorySlug: "illustrator",
    image: "/luxury-brand-identity-photography.jpg",
    rotation: -5,
    description: "Luxury brand identity with custom illustration work",
    year: "2024",
  },
  {
    title: "KINETIC",
    category: "Web Experience",
    categorySlug: "ui-ux",
    image: "/minimalist-web-design-showcase.jpg",
    rotation: 5,
    description: "Interactive web experience with seamless UX",
    year: "2024",
  },
  {
    title: "AETHER",
    category: "Product Design",
    categorySlug: "packaging-design",
    image: "/architectural-product-design.jpg",
    rotation: -8,
    description: "Premium product packaging with architectural influence",
    year: "2023",
  },
  {
    title: "VERTEX",
    category: "Digital Art",
    categorySlug: "photoshop",
    image: "/abstract-digital-art-3d.jpg",
    rotation: 3,
    description: "Abstract digital compositions and photo manipulation",
    year: "2023",
  },
  {
    title: "FLOW STATE",
    category: "Motion Design",
    categorySlug: "2d-animation",
    image: "/placeholder.svg?key=hj414",
    rotation: -3,
    description: "Fluid 2D motion graphics and character animation",
    year: "2024",
  },
  {
    title: "ECLIPSE",
    category: "Visual Effects",
    categorySlug: "after-effects",
    image: "/placeholder.svg?key=l5l05",
    rotation: 4,
    description: "Cinematic motion design and visual effects",
    year: "2023",
  },
];

export const SKILLS: Skill[] = [
  {
    name: "React / Next.js",
    level: "EXPERT",
    color: "from-blue-400 to-cyan-500",
  },
  { name: "TypeScript", level: "EXPERT", color: "from-blue-600 to-indigo-600" },
  {
    name: "GSAP / Motion",
    level: "ADVANCED",
    color: "from-green-400 to-emerald-600",
  },
  { name: "Tailwind CSS", level: "EXPERT", color: "from-sky-400 to-blue-500" },
  {
    name: "UI Architecture",
    level: "ADVANCED",
    color: "from-purple-500 to-pink-500",
  },
  { name: "Performance", level: "EXPERT", color: "from-orange-400 to-red-500" },
  {
    name: "Design Systems",
    level: "ADVANCED",
    color: "from-amber-400 to-yellow-600",
  },
  {
    name: "WebGL / Three.js",
    level: "INTERMEDIATE",
    color: "from-indigo-400 to-purple-600",
  },
  {
    name: "Accessibility",
    level: "ADVANCED",
    color: "from-teal-400 to-emerald-500",
  },
  {
    name: "Brand Strategy",
    level: "INTERMEDIATE",
    color: "from-rose-400 to-red-600",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "SARAH JENKINS",
    role: "CEO at TechFlow",
    text: "Omar's ability to translate complex ideas into fluid digital experiences is unmatched. A true creative partner.",
    gradient: "from-blue-500/20 to-purple-500/20",
    rotation: -2,
  },
  {
    name: "MICHAEL CHEN",
    role: "Design Lead at Studio8",
    text: "The motion work Omar delivered for our rebrand was the highlight of the project. Highly professional and deeply creative.",
    gradient: "from-gold/20 to-orange-500/20",
    rotation: 3,
  },
  {
    name: "EMMA WATSON",
    role: "Product Manager at Archi",
    text: "Technical excellence combined with a rare design eye. Omar helped us achieve a level of polish we didn't think possible.",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    rotation: -4,
  },
];

// Map work categories to tech stack images
export const CATEGORY_TECH_MAP: Record<string, string> = {
  "illustrator": "/images/react2.webp",
  "2d-animation": "/images/next2.webp",
  "packaging-design": "/images/typescript.webp",
  "ui-ux": "/images/javascript.webp",
  "after-effects": "/images/react2.webp",
  "photoshop": "/images/next2.webp",
};

// Map skills to tech stack images
export const SKILL_TECH_MAP: Record<string, string> = {
  "React / Next.js": "/images/react2.webp",
  "TypeScript": "/images/typescript.webp",
  "GSAP / Motion": "/images/javascript.webp",
  "Tailwind CSS": "/images/javascript.webp",
  "UI Architecture": "/images/next2.webp",
  "Performance": "/images/react2.webp",
  "Design Systems": "/images/typescript.webp",
  "WebGL / Three.js": "/images/react2.webp",
  "Accessibility": "/images/next2.webp",
  "Brand Strategy": "/images/typescript.webp",
};
