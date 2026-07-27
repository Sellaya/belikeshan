# Belikeshan — Adventure Portfolio

A premium, cinematic portfolio website for an adventure motorcyclist, filmmaker, photographer, and storyteller. Built to feel like entering a documentary — not a portfolio.

## Tech Stack

- **Next.js 15** — App Router, static generation
- **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Framer Motion** — scroll animations, transitions
- **Lenis** — smooth scrolling
- **GSAP** — available for advanced animations
- **MDX Content Collections** — expeditions and blog managed via Markdown

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve production
```

## Content Management

All content lives in the `content/` directory:

```
content/
  expeditions/   # One .mdx file per expedition
  blog/          # One .mdx file per journal post
data/            # Static data (gear, films, media, partners)
```

### Adding a New Expedition

Create `content/expeditions/your-expedition.mdx` with frontmatter:

```yaml
---
slug: your-expedition
title: Your Expedition Title
subtitle: Subtitle
description: Short description
coverImage: https://...
featured: false
status: completed
startDate: 2025-01-01
countries: [Country1, Country2]
distance: 5000
days: 30
motorcycle: BMW R 1250 GS
stats:
  - label: Distance
    value: 5,000 km
gallery: []
videos: []
timeline: []
seo:
  title: SEO Title
  description: SEO Description
  keywords: [keyword1, keyword2]
---

Your expedition story in Markdown...
```

This automatically generates:
- Journey page at `/expeditions/your-expedition`
- Map marker (add to `MAP_MARKERS` in Journeys component)
- Gallery, stats, timeline, and SEO

### Adding a Blog Post

Create `content/blog/your-post.mdx`:

```yaml
---
slug: your-post
title: Post Title
excerpt: Short excerpt
coverImage: https://...
date: 2025-01-01
category: journal
readTime: 5 min
---

Post content in Markdown...
```

## Project Structure

```
app/                    # Next.js pages
components/
  sections/             # Homepage sections
  layout/               # Navigation, Footer, SmoothScroll
  ui/                   # Cursor, Loader, ScrollProgress
  mdx/                  # MDX content renderer
content/                # MDX content collections
data/                   # Static data files
lib/                    # Utils, types, content loader
```

## Design Philosophy

- Dark mode only — cinematic, timeless
- Minimal palette: #0F0F0F, warm sand, forest green, burnt orange
- Large typography, generous negative space
- Intentional animations — emotion over effects
- Every section tells a story

## License

Private — All rights reserved.
