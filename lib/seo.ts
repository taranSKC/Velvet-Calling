import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://velvetcall.com"

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VelvetCall — Talk to Your Fantasy Girls Live",
    template: "%s — VelvetCall",
  },
  description:
    "Live intimate calls, flirty chatrooms, and premium exclusive photo/video collections with hot performers.",
  keywords: [
    "live calls",
    "adult entertainment",
    "fantasy girls",
    "intimate chat",
    "voice calls",
    "premium content",
    "adult performers",
    "live voice chat",
    "exclusive videos",
    "photo galleries",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: "VelvetCall",
    locale: "en_US",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "VelvetCall",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export function createMetadata(overrides: {
  title: string
  description: string
  path: string
  keywords?: string[]
  ogImage?: string
  noIndex?: boolean
}): Metadata {
  const url = `${siteUrl}${overrides.path}`
  const twitterImages = overrides.ogImage
    ? [`${siteUrl}${overrides.ogImage}`]
    : undefined

  return {
    ...defaultMetadata,
    title: overrides.title,
    description: overrides.description,
    keywords: [...(defaultMetadata.keywords as string[]), ...(overrides.keywords || [])],
    robots: overrides.noIndex ? { index: false, follow: false } : defaultMetadata.robots,
    alternates: { canonical: url },
    openGraph: {
      ...defaultMetadata.openGraph,
      title: overrides.title,
      description: overrides.description,
      url,
      images: overrides.ogImage
        ? [{ url: `${siteUrl}${overrides.ogImage}`, width: 1200, height: 630, alt: overrides.title }]
        : defaultMetadata.openGraph?.images,
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: overrides.title,
      description: overrides.description,
      images: twitterImages,
    },
  }
}

export function jsonLdWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VelvetCall",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/girls?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  }
}

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "VelvetCall",
    url: siteUrl,
    logo: `${siteUrl}/favicon.svg`,
    sameAs: [],
  }
}

export function jsonLdBreadcrumb(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${item.item}`,
    })),
  }
}

export { siteUrl }
