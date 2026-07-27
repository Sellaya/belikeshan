export type NavLink = {
  label: string;
  href: string;
  /** Hash links scroll on homepage; paths navigate directly */
  type?: "hash" | "page";
  description?: string;
};

export type NavGroup = {
  label: string;
  href?: string;
  links: NavLink[];
};

/** Primary desktop nav — grouped for clarity */
export const navGroups: NavGroup[] = [
  {
    label: "About",
    href: "#about",
    links: [{ label: "Who I Am", href: "#about", type: "hash", description: "Story, philosophy & journey" }],
  },
  {
    label: "Expeditions",
    links: [
      { label: "Recent Journeys", href: "#journeys", type: "hash", description: "USA Loop & upcoming rides" },
      { label: "Past Expeditions", href: "#past-journeys", type: "hash", description: "Lahore to Gwadar & more" },
      { label: "USA Loop", href: "/expeditions/usa-loop", type: "page", description: "10,000 miles · 25 states" },
      {
        label: "Lahore to Gwadar",
        href: "/expeditions/lahore-to-gwadar",
        type: "page",
        description: "5,000 km · Makran coast",
      },
      { label: "All Expeditions", href: "/expeditions", type: "page", description: "Full expedition archive" },
    ],
  },
  {
    label: "Media",
    links: [
      { label: "Photography", href: "#gallery", type: "hash", description: "Gallery from the road" },
      { label: "Films", href: "#films", type: "hash", description: "Documentaries & trailers" },
      { label: "Latest Videos", href: "#social", type: "hash", description: "YouTube & Instagram" },
      { label: "Press & TV", href: "#press", type: "hash", description: "Interviews & coverage" },
    ],
  },
  {
    label: "Journal",
    href: "/blog",
    links: [{ label: "Stories from the Road", href: "/blog", type: "page", description: "Travel journal & tips" }],
  },
  {
    label: "Contact",
    href: "#contact",
    links: [{ label: "Get in Touch", href: "#contact", type: "hash", description: "hello@belikeshan.com" }],
  },
];

/** Flat list for scroll-spy (hash links only) */
export const hashSections = navGroups
  .flatMap((g) => g.links)
  .filter((l) => l.type !== "page" && l.href.startsWith("#"));

/** Footer sitemap columns */
export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "About", href: "/#about" },
      { label: "Photography", href: "/#gallery" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Expeditions",
    links: [
      { label: "Recent Journeys", href: "/#journeys" },
      { label: "Past Expeditions", href: "/#past-journeys" },
      { label: "USA Loop", href: "/expeditions/usa-loop" },
      { label: "Lahore to Gwadar", href: "/expeditions/lahore-to-gwadar" },
      { label: "All Expeditions", href: "/expeditions" },
    ],
  },
  {
    title: "Media",
    links: [
      { label: "Films", href: "/#films" },
      { label: "Latest Videos", href: "/#social" },
      { label: "Press & TV", href: "/#press" },
      { label: "Travel Journal", href: "/blog" },
    ],
  },
];
