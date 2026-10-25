export type Link = { label: string; href: string };
export type Perspective = {
  key: string;
  label: string;
  visual: 'structure' | 'layers' | 'ripples';
  title: string;
  body: string;
  link: Link;
};
export type Featured = {
  no: string;
  kind: string;
  title: string;
  body: string;
  image: string;
  domain?: string;
  caption: string;
  meta?: string;
  sub?: string;
  href: string;
};
export type Project = {
  title: string;
  tag: 'fullstack' | 'frontend';
  chip: string;
  meta: string;
  body: string;
  image: string;
  live: string;
  code: string;
};
export type Discipline = { no: string; kind: string; title: string; body: string; stack: string; steps: string[] };
export type Milestone = { date: string; lead: string; body: string; link?: Link };
export type Chapter = { date: string; title: string; body: string };

export const site = {
  name: 'Maruf Ahamed Fardin',
  first: 'Maruf Ahamed',
  last: 'Fardin',
  role: 'Full Stack Developer',
  email: 'marufahamedfardin20@gmail.com',
  phone: '+880 1939 666 135',
  location: 'Mirpur, Dhaka, Bangladesh',
  github: 'https://github.com/maruf-ahamed-fardin',
  linkedin: 'https://www.linkedin.com/in/maruf-ahamed-fardin-36a941215',
  // leave empty to hide the link everywhere
  facebook: '',
  instagram: '',
  cv: '/Maruf_Ahamed_Fardin_CV.pdf',
  url: 'https://maruf-ahamed-fardin.vercel.app',
} as const;

export type SocialKey = 'linkedin' | 'github' | 'facebook' | 'instagram';
export type Social = { key: SocialKey; label: string; handle: string; note: string; href: string };

/** Social profiles shown in the contact panel, footer and JSON-LD. Entries without a URL are skipped. */
export const socials: Social[] = (
  [
    { key: 'linkedin', label: 'LinkedIn', handle: 'Maruf Ahamed Fardin', note: 'Career & shipping notes', href: site.linkedin },
    { key: 'github', label: 'GitHub', handle: '@maruf-ahamed-fardin', note: 'Code in the open', href: site.github },
    { key: 'facebook', label: 'Facebook', handle: 'Maruf Ahamed Fardin', note: 'Life between commits', href: site.facebook },
    { key: 'instagram', label: 'Instagram', handle: '', note: 'Moments, off screen', href: site.instagram },
  ] satisfies Social[]
).filter((s) => s.href);

/** Search / AI-answer facts. Kept factual and consistent everywhere (metadata, JSON-LD, llms.txt). */
export const seo = {
  title: 'Maruf Ahamed Fardin — Full Stack Developer (React, Next.js, AI) in Dhaka',
  shortTitle: 'Maruf Ahamed Fardin — Full Stack Developer',
  description:
    'Maruf Ahamed Fardin is a Full Stack Developer at SeloraX in Dhaka, Bangladesh, building production web apps with React, Next.js, TypeScript, Prisma and PostgreSQL, plus LLM, RAG and AI features.',
  summary:
    'Maruf Ahamed Fardin is a Junior Full Stack Developer at SeloraX (Dhaka, Bangladesh) and a Computer Science & Engineering student at Uttara University. He joined SeloraX in November 2025 as a Frontend Developer Apprentice, became a Web Developer Intern in January 2026 and a Junior Full Stack Developer in July 2026. He builds full-stack products with React, Next.js, TypeScript, Tailwind CSS, Node.js, Prisma, Drizzle, PostgreSQL and MySQL, and AI features with the Claude API, RAG and pgvector.',
  alternateNames: ['Maruf Fardin', 'Maruf Ahamed', 'maruf-ahamed-fardin', 'MAF'],
  jobTitle: 'Junior Full Stack Developer',
  employer: { name: 'SeloraX', url: 'https://selorax.io' },
  education: { name: 'Uttara University', degree: 'BSc in Computer Science & Engineering', start: '2024' },
  locality: 'Dhaka',
  country: 'BD',
  skills: [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'shadcn/ui', 'Node.js', 'Express', 'Prisma', 'Drizzle ORM',
    'PostgreSQL', 'MySQL', 'MongoDB', 'Auth.js', 'Zod', 'REST APIs', 'Claude API', 'Large Language Models', 'RAG', 'pgvector',
    'Python', 'scikit-learn', 'Progressive Web Apps', 'Figma to code', 'Full Stack Development',
  ],
  keywords: [
    'Maruf Ahamed Fardin', 'Maruf Fardin', 'Maruf Ahamed Fardin portfolio', 'Maruf Ahamed Fardin developer',
    'Full Stack Developer Dhaka', 'Full Stack Developer Bangladesh', 'Next.js developer Bangladesh', 'React developer Dhaka',
    'TypeScript developer', 'AI developer Bangladesh', 'LLM RAG developer', 'SeloraX developer', 'Uttara University CSE',
  ],
} as const;

export const nav: Link[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
];

export const heroStats = [
  { value: '2', suffix: '×', label: 'promotions at SeloraX in just 8 months' },
  { value: '24', suffix: '+', label: 'public repositories on GitHub' },
  { value: '12', suffix: '+', label: 'products shipped & deployed' },
];

// Three perspectives used by the interactive "field" panels
export const perspectives: Perspective[] = [
  {
    key: 'frontend',
    label: 'Frontend',
    visual: 'structure',
    title: 'Give an idea an interface.',
    body: 'Figma designs turned into responsive, reusable React components that feel fast on every screen.',
    link: { label: 'Explore the products', href: '#work' },
  },
  {
    key: 'backend',
    label: 'Backend',
    visual: 'layers',
    title: 'Make the data dependable.',
    body: 'APIs, auth and schemas with Prisma and PostgreSQL—so features hold up from the UI to the database.',
    link: { label: 'See the full stack', href: '#stack' },
  },
  {
    key: 'ai',
    label: 'AI & LLM',
    visual: 'ripples',
    title: 'Teach software to answer.',
    body: 'LLM agents, RAG and vector search with the Claude API—useful intelligence wired into real products.',
    link: { label: 'Inside the AI builds', href: '#projects' },
  },
];

export const featured: Featured[] = [
  {
    no: '01',
    kind: 'Product & engineering',
    title: 'SeloraX Employee Management System',
    body: 'Staff records, shift-based attendance, leave, payroll and QR employee cards across four user roles—built end-to-end for the company.',
    image: '/images/work/ems-dashboard-maruf.jpg',
    domain: 'employee-management-system-nu-azure.vercel.app',
    caption: 'Workforce & HR platform',
    meta: 'Next.js · TypeScript · Prisma',
    href: 'https://employee-management-system-nu-azure.vercel.app',
  },
  {
    no: '02',
    kind: 'Full-stack · AI',
    title: 'TaleForge Storytelling AI',
    body: 'A Bangla and English story-writing platform that adapts to a writer’s style, with story chat, image-to-story and a story library.',
    image: '/images/work/taleforge.jpg',
    domain: 'tale-forge-web.vercel.app',
    caption: 'AI writing experience',
    meta: 'Next.js · FastAPI · PostgreSQL',
    href: 'https://tale-forge-web.vercel.app',
  },
  {
    no: '03',
    kind: 'AI voice automation',
    title: 'Nexus AI: Calls That Convert',
    body: 'An AI calling product experience—verification, lead qualification and booking calls with human-like voices, wrapped in a bold interface.',
    image: '/images/work/xcall.jpg',
    caption: 'AI calling assistant',
    sub: 'LLM agent · voice UI',
    href: 'https://ai-call-one.vercel.app',
  },
];

export const moreWork = [
  {
    no: '04',
    kind: 'AI customer assistant',
    title: 'Alora',
    badge: 'RAG',
    href: 'https://github.com/maruf-ahamed-fardin/Alora',
  },
  {
    no: '05',
    kind: 'Mess & hostel management',
    title: 'MessHub',
    badge: 'PWA',
    href: 'https://github.com/maruf-ahamed-fardin/MessHub',
  },
  {
    no: '06',
    kind: 'Machine learning',
    title: 'Cricket Predictor Pro',
    badge: 'ML',
    href: 'https://github.com/maruf-ahamed-fardin/Cricket-Predictor-Pro',
  },
];

export const disciplines: Discipline[] = [
  {
    no: '01',
    kind: 'Frontend engineering',
    title: 'Build with intention.',
    body: 'I connect what users need with what the interface can do. From the first Figma frame to the component people click.',
    stack: 'React · Next.js · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion',
    steps: ['Understand the need', 'Shape the experience', 'Ship the interface'],
  },
  {
    no: '02',
    kind: 'Backend & data',
    title: 'Make data dependable.',
    body: 'Server actions, route handlers and schemas that keep features honest—validated, typed and close to the database.',
    stack: 'Node.js · Express · Prisma · Drizzle · PostgreSQL · MySQL · Auth.js · Zod',
    steps: ['Model the data', 'Design the API', 'Guard every edge'],
  },
  {
    no: '03',
    kind: 'AI & machine learning',
    title: 'Make software think.',
    body: 'LLM integrations, RAG pipelines and evaluation scripts that turn a model into something a business can trust.',
    stack: 'Claude API · RAG · pgvector · Embeddings · Python · scikit-learn · Flask',
    steps: ['Gather the context', 'Retrieve what matters', 'Measure the answers'],
  },
];

export const journey: Milestone[] = [
  {
    date: 'Nov 2025',
    lead: 'Frontend Developer Apprentice.',
    body: 'Joined SeloraX building responsive interfaces with HTML, CSS, JavaScript and React under senior developers.',
  },
  {
    date: 'Jan 2026',
    lead: 'Web Developer Intern.',
    body: 'Converted Figma designs into reusable React components for the SeloraX dashboard and built internal tools that sped up the team.',
  },
  {
    date: 'Jul 2026',
    lead: 'Junior Full Stack Developer.',
    body: 'Designing and building e-commerce website frontends and the SeloraX dashboard, and shipping the XCall chat interface and SeloraX EMS end-to-end—from UI to database. Delivered 300+ landing pages and 20+ e-commerce websites for businesses.',
  },
];

export const projects: Project[] = [
  {
    title: 'Team Profile.',
    tag: 'fullstack',
    chip: 'SeloraX',
    meta: 'SeloraX / Server-rendered · MySQL',
    body: 'Searchable staff directory exposing only public fields',
    image: '/images/work/teamprofile.jpg',
    live: 'https://team-profile-selorax.vercel.app/',
    code: 'https://github.com/maruf-ahamed-fardin/Team-Profile',
  },
  {
    title: 'Care, connected.',
    tag: 'frontend',
    chip: 'Dr Nature',
    meta: 'Dr Nature / Next.js 15 · Framer Motion',
    body: 'Healthcare & e-commerce platform interface',
    image: '/images/work/drnature.jpg',
    live: 'https://dr-nature.vercel.app',
    code: 'https://github.com/maruf-ahamed-fardin/Dr-Nature',
  },
  {
    title: 'Weather, installed.',
    tag: 'frontend',
    chip: 'ClimateHub',
    meta: 'ClimateHub / PWA · Push notifications',
    body: 'Advanced weather PWA with forecasts & trends',
    image: '/images/work/climatehub.jpg',
    live: 'https://climatehub-pwa-advanced.vercel.app',
    code: 'https://github.com/maruf-ahamed-fardin/climatehub-pwa-advanced',
  },
  {
    title: 'Meet, in real time.',
    tag: 'fullstack',
    chip: 'Talksy',
    meta: 'Talksy / React · ZEGOCLOUD',
    body: 'Video meetups for remote teams and families',
    image: '/images/work/talksy.jpg',
    live: 'https://talksy-pied.vercel.app',
    code: 'https://github.com/maruf-ahamed-fardin/talksy',
  },
  {
    title: 'Money, made clear.',
    tag: 'fullstack',
    chip: 'BudgetBD',
    meta: 'BudgetBD / Server Actions · SQLite',
    body: 'Student budget planner with charts & goals',
    image: '/images/work/budget.jpg',
    live: 'https://student-budget-planner-gamma.vercel.app',
    code: 'https://github.com/maruf-ahamed-fardin/student-budget-planner',
  },
  {
    title: 'Anime, explored.',
    tag: 'frontend',
    chip: 'Anime Vault',
    meta: 'Anime Vault / Next.js · TypeScript',
    body: 'Discover and browse diverse anime realms',
    image: '/images/work/anime.jpg',
    live: 'https://anime-magic-iota.vercel.app',
    code: 'https://github.com/maruf-ahamed-fardin/anime-magic',
  },
];

export const stackRows = [
  { kind: 'Frontend / Interfaces', title: 'React, Next.js App Router, TypeScript, Tailwind CSS' },
  { kind: 'Backend / Data', title: 'Node.js, Prisma, Drizzle, PostgreSQL, MySQL, MongoDB' },
  { kind: 'AI / Machine learning', title: 'Claude API, RAG, pgvector, Python, scikit-learn' },
];

export const interlude: Chapter[] = [
  {
    date: '2024',
    title: 'Choosing the craft.',
    body: 'Started my BSc in Computer Science & Engineering at Uttara University—and started building on the side.',
  },
  {
    date: '2025',
    title: 'Learning by building.',
    body: 'Joined SeloraX as a Frontend Developer Apprentice in November. Real products became the classroom.',
  },
  {
    date: 'Today',
    title: 'Shipping across the stack.',
    body: 'Junior Full Stack Developer delivering dashboards, an AI calling assistant’s interface and internal systems end-to-end.',
  },
  {
    date: 'Next',
    title: 'Smarter software. Greater reach.',
    body: 'Building LLM-powered products with ambitious teams—useful intelligence, carefully engineered.',
  },
];
