import { profile } from "@/data/profile";
import { SOCIAL_CHANNELS } from "@/data/social-videos";
import { absoluteUrl, CREATOR, SITE_NAME, SITE_URL } from "@/lib/seo";
import type { BlogPost, Expedition } from "@/lib/types";

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "Pakistani adventure rider Shan-e-Ali documents solo motorcycle expeditions, films and photography from belikeshan.",
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#person` },
  };
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    alternateName: [profile.brand, profile.handle],
    url: SITE_URL,
    image: absoluteUrl(profile.portrait),
    email: profile.email,
    jobTitle: ["Adventure Motorcyclist", "Filmmaker", "Travel Storyteller"],
    nationality: { "@type": "Country", name: "Pakistan" },
    homeLocation: { "@type": "Place", name: profile.location },
    knowsAbout: [
      "Motorcycle adventure travel",
      "Solo motorcycle expeditions",
      "Travel filmmaking",
      "Pakistan motorcycle touring",
      "USA motorcycle loop",
    ],
    sameAs: [SOCIAL_CHANNELS.youtube, SOCIAL_CHANNELS.instagram, SOCIAL_CHANNELS.facebook],
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/media/gallery/gallery-34.jpg"),
    founder: { "@id": `${SITE_URL}/#person` },
    sameAs: [SOCIAL_CHANNELS.youtube, SOCIAL_CHANNELS.instagram, SOCIAL_CHANNELS.facebook],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function expeditionJsonLd(expedition: Expedition) {
  return {
    "@context": "https://schema.org",
    "@type": "Trip",
    name: expedition.title,
    description: expedition.description,
    url: absoluteUrl(`/expeditions/${expedition.slug}`),
    image: absoluteUrl(expedition.coverImage),
    touristType: "Adventure motorcycle traveler",
    itinerary: {
      "@type": "ItemList",
      name: expedition.route,
    },
    provider: { "@id": `${SITE_URL}/#person` },
    ...(expedition.startDate
      ? {
          startDate: expedition.startDate,
          endDate: expedition.endDate ?? expedition.startDate,
        }
      : {}),
  };
}

export function blogPostJsonLd(post: BlogPost & { content?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl(post.coverImage),
    datePublished: post.date,
    author: { "@type": "Person", name: CREATOR, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteUrl("/media/gallery/gallery-34.jpg") },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    articleSection: post.category,
  };
}

export function homePageJsonLd() {
  return [websiteJsonLd(), personJsonLd(), organizationJsonLd()];
}
