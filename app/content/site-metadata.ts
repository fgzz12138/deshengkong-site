import type { Metadata } from "next";

export const SITE_ORIGIN = "https://www.deshengkong.com";

const socialCard = {
  url: "/portfolio/social-card.png",
  width: 1200,
  height: 630,
  alt: "Desheng Kong — AI systems. Built for real work.",
};

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}`;
  type?: "website" | "article";
};

// Next replaces nested social metadata, so every page supplies the complete set.
export function createPageMetadata({
  title,
  description,
  path,
  type = "website",
}: PageMetadataInput): Metadata {
  const canonical = new URL(path, SITE_ORIGIN).toString();

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type,
      locale: "en_AU",
      siteName: "Desheng Kong",
      images: [socialCard],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialCard],
    },
  };
}
