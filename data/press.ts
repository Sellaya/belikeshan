/** Defining achievement — use this wording consistently across the site */
export const HISTORIC_ACHIEVEMENT =
  "First and only Pakistani passport holder to complete a solo motorcycle loop across the United States.";

export const EXPEDITION_FACTS = {
  name: "Shan-e-Ali",
  brand: "belikeshan",
  nationality: "Pakistani",
  passport: "Pakistani Passport",
  motorcycle: "Suzuki DR650",
  duration: "33 Days",
  distanceKm: "16,000",
  distanceMiles: "10,000",
  year: "2026",
} as const;

export type VerifiedPressItem = {
  id: string;
  publication: string;
  publicationType: string;
  title: string;
  date: string;
  description: string;
  url: string;
  verified: true;
  featured?: boolean;
  language?: "en" | "ur";
  thumbnail?: string;
  author?: string;
  youtubeEmbed?: string;
};

export const verifiedPressLogos = [
  "Business Recorder",
  "HUM News",
  "Daily Khabrain",
  "Economy.pk",
] as const;

export const verifiedPressCoverage: VerifiedPressItem[] = [
  {
    id: "business-recorder",
    publication: "Business Recorder",
    publicationType: "Editorial Feature",
    title: "16,000km, one Pakistani flag: the only Pakistani to conquer the solo US loop",
    date: "23 July 2026",
    description:
      "A detailed editorial feature covering the complete expedition including the preparation, the journey, Yellowstone snow, Arizona heat, Monument Valley accident, cultural encounters across America and the completion of the historic solo USA motorcycle loop.",
    url: "https://www.brecorder.com/news/40431267/16000km-one-pakistani-flag-the-only-pakistani-to-conquer-the-solo-us-loop",
    verified: true,
    featured: true,
    author: "Aisha Mahmood",
    thumbnail: "/media/press/press-05.jpg",
  },
  {
    id: "hum-news",
    publication: "HUM News",
    publicationType: "Broadcast Interview",
    title: "Shan-e-Ali Biker and Rider | Completes Historic 16,000 KM Solo Journey",
    date: "July 2026",
    description:
      "Official HUM News interview highlighting Shan-e-Ali's historic solo motorcycle expedition across the United States.",
    url: "https://www.youtube.com/watch?v=6-lFtf_Un6Y",
    verified: true,
    featured: true,
    thumbnail: "/media/press/hum-news.jpg",
    youtubeEmbed: "https://www.youtube-nocookie.com/embed/6-lFtf_Un6Y",
  },
  {
    id: "daily-khabrain",
    publication: "Daily Khabrain",
    publicationType: "News Report",
    title: "پاکستانی بائیکر شان علی نے امریکا بھر میں تنہا موٹر سائیکل کا سفر مکمل کر کے نئی تاریخ رقم کر دی",
    date: "25 July 2026",
    description:
      "Urdu coverage documenting the complete expedition, the motorcycle, extreme weather, the Monument Valley accident and successful completion of the USA loop.",
    url: "https://dailykhabrain.com.pk/2026/07/25/504355/",
    verified: true,
    language: "ur",
    thumbnail: "/media/press/press-04.jpg",
  },
  {
    id: "economy-pk",
    publication: "Economy.pk",
    publicationType: "Editorial Feature",
    title: "16,000km, one Pakistani flag: the only Pakistani to conquer the solo US loop",
    date: "24 July 2026",
    description:
      "Travel feature covering the historic expedition, endurance, challenges and representing Pakistan across America.",
    url: "https://www.economy.pk/16000km-one-pakistani-flag-the-only-pakistani-to-conquer-the-solo-us-loop/",
    verified: true,
    thumbnail: "/media/press/press-05.jpg",
  },
];

export const featuredPress = verifiedPressCoverage.filter((item) => item.featured);
export const additionalPress = verifiedPressCoverage.filter((item) => !item.featured);

export const editorialStory = {
  heading: "Beyond the Distance",
  paragraphs: [
    "The journey represented far more than covering kilometres.",
    "Across deserts, mountains, forests, coastlines and remote highways, the expedition became a story about perseverance, curiosity and representing Pakistan through meaningful human connections.",
    "Every challenge added another chapter—from freezing temperatures near Yellowstone to intense Arizona heat and recovering after a motorcycle crash near Monument Valley.",
    "The expedition demonstrated that determination, preparation and resilience can carry a rider across an entire continent while proudly representing Pakistan.",
  ],
};
