"use client";

import { motion } from "framer-motion";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 620;

function project(lat: number, lng: number): [number, number] {
  const x = ((lng + 125) / 59) * VIEW_WIDTH;
  const y = ((49 - lat) / 25) * VIEW_HEIGHT;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

/** Simplified continental US silhouette */
const usaOutline = (() => {
  const border: [number, number][] = [
    [48.5, -124.7],
    [46.2, -124.2],
    [42.1, -124.6],
    [38.0, -122.5],
    [34.5, -120.5],
    [32.7, -117.2],
    [31.9, -114.7],
    [31.3, -108.2],
    [29.3, -103.0],
    [29.4, -99.0],
    [26.0, -97.2],
    [25.9, -97.4],
    [26.0, -82.0],
    [30.4, -81.4],
    [32.0, -80.8],
    [33.8, -78.5],
    [34.7, -76.0],
    [36.9, -75.7],
    [38.8, -75.0],
    [40.5, -74.0],
    [41.3, -70.0],
    [43.1, -70.6],
    [43.8, -67.0],
    [45.0, -67.0],
    [47.5, -69.2],
    [47.3, -88.0],
    [48.0, -95.0],
    [48.8, -104.0],
    [49.0, -123.0],
    [48.5, -124.7],
  ];
  return border.map((p, i) => `${i === 0 ? "M" : "L"} ${project(...p).join(",")}`).join(" ") + " Z";
})();

/** USA Loop route — traced from expedition map (Dallas loop) */
const routeWaypoints: [number, number][] = [
  [32.78, -96.8], // Dallas — start
  [34.74, -92.29], // Arkansas
  [35.23, -80.84], // Charlotte
  [38.91, -77.04], // Washington D.C.
  [40.71, -74.01], // New York
  [42.65, -73.78], // Albany
  [42.65, -78.85], // Buffalo
  [41.88, -87.63], // Chicago
  [44.98, -93.27], // Minneapolis
  [44.08, -103.23], // South Dakota
  [44.5, -110.5], // Yellowstone
  [46.0, -112.5], // Montana
  [47.66, -117.43], // Spokane
  [47.61, -122.33], // Seattle
  [45.52, -122.68], // Portland
  [42.3, -122.8], // Oregon
  [37.77, -122.42], // San Francisco
  [36.2, -121.8], // Big Sur
  [34.05, -118.24], // Los Angeles
  [36.17, -115.14], // Las Vegas
  [37.59, -112.18], // Bryce Canyon
  [38.57, -109.55], // Moab
  [37.0, -110.2], // Monument Valley
  [36.1, -109.5], // Four Corners loop
  [35.08, -106.65], // Albuquerque
  [32.45, -99.73], // Texas
  [32.78, -96.8], // Dallas — end
];

function buildRoutePath(points: [number, number][]): string {
  const svg = points.map((p) => project(...p));
  let d = `M ${svg[0][0]} ${svg[0][1]}`;
  for (let i = 1; i < svg.length; i++) {
    const prev = svg[i - 1];
    const curr = svg[i];
    const cx = (prev[0] + curr[0]) / 2;
    const cy = (prev[1] + curr[1]) / 2;
    d += ` Q ${prev[0]} ${prev[1]} ${cx} ${cy}`;
  }
  const last = svg[svg.length - 1];
  d += ` L ${last[0]} ${last[1]}`;
  return d;
}

const routePath = buildRoutePath(routeWaypoints);

const markers = [
  { lat: 32.78, lng: -96.8, label: "Start" },
  { lat: 47.61, lng: -122.33, label: "Seattle" },
  { lat: 40.71, lng: -74.01, label: "NYC" },
  { lat: 34.05, lng: -118.24, label: "LA" },
  { lat: 37.0, lng: -110.2, label: "Monument Valley" },
] as const;

interface UsaLoopMapProps {
  className?: string;
}

export default function UsaLoopMap({ className = "" }: UsaLoopMapProps) {
  return (
    <svg
      viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
      className={className}
      aria-label="USA Loop Expedition route map across the United States"
      role="img"
    >
      <defs>
        <linearGradient id="usaFill" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.12" />
          <stop offset="100%" stopColor="white" stopOpacity="0.04" />
        </linearGradient>

        <linearGradient id="usaStroke" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.45" />
          <stop offset="100%" stopColor="white" stopOpacity="0.15" />
        </linearGradient>

        <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#a8c4e0" stopOpacity="0.85" />
        </linearGradient>

        <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="markerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Continental US */}
      <path
        d={usaOutline}
        fill="url(#usaFill)"
        stroke="url(#usaStroke)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Route glow layer */}
      <motion.path
        d={routePath}
        fill="none"
        stroke="white"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.25}
        filter="url(#routeGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.25 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
      />

      {/* Main route */}
      <motion.path
        d={routePath}
        fill="none"
        stroke="url(#routeGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#routeGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
      />

      {/* Waypoint markers */}
      {markers.map((marker, i) => {
        const [x, y] = project(marker.lat, marker.lng);
        const isStart = marker.label === "Start";
        return (
          <g key={marker.label} filter="url(#markerGlow)">
            <motion.circle
              cx={x}
              cy={y}
              r={isStart ? 7 : 5}
              fill={isStart ? "white" : "rgba(255,255,255,0.9)"}
              stroke="white"
              strokeWidth={isStart ? 2 : 1.5}
              strokeOpacity={0.5}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.8 + i * 0.15, duration: 0.4 }}
            />
            {isStart && (
              <motion.circle
                cx={x}
                cy={y}
                r={12}
                fill="none"
                stroke="white"
                strokeWidth="1"
                opacity={0.35}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.35 }}
                viewport={{ once: true }}
                transition={{ delay: 2.2, duration: 0.6 }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
