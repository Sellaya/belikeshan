export interface Expedition {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  story: string;
  coverImage: string;
  heroVideo?: string;
  featured: boolean;
  status: "completed" | "ongoing" | "upcoming";
  startDate: string;
  endDate?: string;
  countries: string[];
  countryFlags: string[];
  route: string;
  distance: number;
  days: number;
  motorcycle: string;
  coordinates: { lat: number; lng: number }[];
  mapCenter: { lat: number; lng: number };
  stats: { label: string; value: string }[];
  gallery: string[];
  videos: { title: string; youtubeId: string; thumbnail?: string }[];
  timeline: { date: string; title: string; description: string }[];
  seo: { title: string; description: string; keywords: string[] };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: "journal" | "photography" | "behind-the-scenes" | "motorcycle-tips";
  readTime: string;
  content: string;
}

export interface GearItem {
  id: string;
  name: string;
  category: "motorcycle" | "helmet" | "camera" | "drone" | "camping" | "luggage" | "navigation";
  image: string;
  brand: string;
  specs: { label: string; value: string }[];
  description: string;
}

export interface Film {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  year: string;
}

export interface MediaItem {
  id: string;
  title: string;
  publication: string;
  type: "article" | "interview" | "tv" | "social";
  category: "editorial" | "television" | "social";
  platform: "web" | "instagram" | "facebook" | "x";
  date: string;
  link: string;
  excerpt: string;
  thumbnail?: string;
  featured?: boolean;
  author?: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface Profile {
  name: string;
  brand: string;
  handle: string;
  tagline: string;
  subtitle: string;
  roles: string[];
  bio: string;
  shortBio: string;
  portrait: string;
  email: string;
  location: string;
  philosophy: string;
  social: {
    instagram: string;
    youtube: string;
    facebook: string;
    support: string;
    email: string;
  };
  achievements: { label: string; value: string }[];
  timeline: { year: string; title: string; description: string }[];
}
