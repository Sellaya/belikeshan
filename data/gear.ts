import type { GearItem } from "@/lib/types";

export const gear: GearItem[] = [
  {
    id: "motorcycle",
    name: "Suzuki DR650",
    category: "motorcycle",
    brand: "Suzuki",
    image: "/media/gallery/gallery-04.jpg",
    description:
      "The machine that carried Shan-e-Ali 10,000 miles across 25 U.S. states — through snow, desert heat, thunderstorms and a crash near Monument Valley. Simple, tough, and proven.",
    specs: [
      { label: "Type", value: "Dual Sport / Adventure" },
      { label: "Engine", value: "644 cc Single-cylinder" },
      { label: "Expedition", value: "USA Loop 2026" },
      { label: "Distance", value: "10,000 miles / 16,000 km" },
      { label: "Duration", value: "33 days solo" },
    ],
  },
  {
    id: "helmet",
    name: "Adventure Helmet",
    category: "helmet",
    brand: "Expedition Setup",
    image: "/media/gallery/gallery-03.jpg",
    description: "Trusted through Yellowstone snow, Arizona heat and three thunderstorms in one day.",
    specs: [
      { label: "Use", value: "Long-distance solo expedition" },
      { label: "Conditions", value: "Snow to 45°C desert heat" },
    ],
  },
  {
    id: "camera",
    name: "Documentary Camera Kit",
    category: "camera",
    brand: "Be Like Shan",
    image: "/media/gallery/gallery-03.jpg",
    description:
      "Every frame of the USA Loop documentary — films, vlogs and photography from the road.",
    specs: [
      { label: "Output", value: "YouTube documentaries & vlogs" },
      { label: "Channel", value: "Be Like Shan" },
    ],
  },
  {
    id: "camping",
    name: "Expedition Camp Kit",
    category: "camping",
    brand: "Solo Overland Setup",
    image: "/media/gallery/gallery-02.jpg",
    description:
      "Including the soaked overnight camp after rain and snow in Yellowstone — when the tent became part of the story.",
    specs: [
      { label: "Use", value: "Solo motorcycle camping" },
      { label: "Tested", value: "Yellowstone snow & desert heat" },
    ],
  },
  {
    id: "luggage",
    name: "Expedition Luggage",
    category: "luggage",
    brand: "Touring Setup",
    image: "/media/gallery/gallery-44.jpg",
    description: "Everything needed for 33 days and 25 states — carried solo across the full USA loop.",
    specs: [
      { label: "Duration", value: "33-day self-supported loop" },
      { label: "Route", value: "25 U.S. states" },
    ],
  },
  {
    id: "flag",
    name: "Pakistani Flag",
    category: "navigation",
    brand: "Symbol of the Journey",
    image: "/media/gallery/gallery-26.jpg",
    description:
      "Worn on the jacket across 10,000 miles. In small American towns, the flag became an invitation to talk, learn and leave a positive impression of Pakistan.",
    specs: [
      { label: "Carried", value: "Full USA Loop expedition" },
      { label: "Meaning", value: "Cultural exchange on two wheels" },
    ],
  },
];
