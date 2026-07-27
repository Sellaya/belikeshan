import type { GearItem } from "@/lib/types";

export const gear: GearItem[] = [
  {
    id: "motorcycle",
    name: "BMW R 1250 GS Adventure",
    category: "motorcycle",
    brand: "BMW Motorrad",
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    description:
      "The ultimate long-distance adventure machine. Proven across 40,000+ km of the world's most demanding terrain.",
    specs: [
      { label: "Engine", value: "1,254 cc Boxer Twin" },
      { label: "Power", value: "136 hp @ 7,750 rpm" },
      { label: "Fuel Capacity", value: "30L + 8L auxiliary" },
      { label: "Weight", value: "268 kg (ready to ride)" },
      { label: "Suspension", value: "Telelever / EVO Paralever" },
    ],
  },
  {
    id: "helmet",
    name: "Shoei Hornet X2",
    category: "helmet",
    brand: "Shoei",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    description:
      "Dual-sport helmet built for every climate — from desert heat to alpine cold.",
    specs: [
      { label: "Type", value: "Dual Sport / Adventure" },
      { label: "Weight", value: "1,650g" },
      { label: "Visor", value: "CNS-2 Pinlock ready" },
      { label: "Ventilation", value: "4 intake, 2 exhaust" },
    ],
  },
  {
    id: "camera",
    name: "Sony FX3",
    category: "camera",
    brand: "Sony",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1ac064392?w=800&q=80",
    description:
      "Cinema line camera in a compact body. Every frame of the documentaries shot on this.",
    specs: [
      { label: "Sensor", value: "Full-frame 12.1MP" },
      { label: "Video", value: "4K 120fps / 10-bit 4:2:2" },
      { label: "ISO", value: "80–409,600" },
      { label: "Stabilization", value: "Active Mode IBIS" },
    ],
  },
  {
    id: "drone",
    name: "DJI Mavic 3 Pro",
    category: "drone",
    brand: "DJI",
    image:
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80",
    description:
      "Triple-camera system for cinematic aerial perspectives across impossible landscapes.",
    specs: [
      { label: "Camera", value: "Hasselblad 4/3 CMOS 20MP" },
      { label: "Flight Time", value: "43 minutes" },
      { label: "Range", value: "15 km O3+ transmission" },
      { label: "Max Speed", value: "21 m/s" },
    ],
  },
  {
    id: "camping",
    name: "Expedition Camp Kit",
    category: "camping",
    brand: "Custom Setup",
    image:
      "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&q=80",
    description:
      "Ultralight camping system designed for solo motorcycle overlanding in any climate.",
    specs: [
      { label: "Tent", value: "MSR Hubba NX 1-person" },
      { label: "Sleeping Bag", value: "-15°C down rated" },
      { label: "Stove", value: "Jetboil Flash" },
      { label: "Total Weight", value: "3.2 kg complete kit" },
    ],
  },
  {
    id: "luggage",
    name: "Touratech Zega Pro",
    category: "luggage",
    brand: "Touratech",
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&q=80",
    description:
      "Bombproof aluminum panniers and top case system. Survived everything the road threw at them.",
    specs: [
      { label: "Material", value: "2mm aluminum" },
      { label: "Capacity", value: "31L per side + 38L top" },
      { label: "Weight", value: "11.4 kg (set)" },
      { label: "Mount", value: "Quick-release steel" },
    ],
  },
  {
    id: "navigation",
    name: "Garmin zumo XT2",
    category: "navigation",
    brand: "Garmin",
    image:
      "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&q=80",
    description:
      "Rugged motorcycle GPS with worldwide mapping. The only co-pilot on solo expeditions.",
    specs: [
      { label: "Display", value: '6" multitouch, sunlight readable' },
      { label: "Maps", value: "Worldwide preloaded" },
      { label: "Battery", value: "Up to 6 hours" },
      { label: "Connectivity", value: "Bluetooth, WiFi, LiveTrack" },
    ],
  },
];
