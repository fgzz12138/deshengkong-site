import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../../content/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "EziSight E-commerce Website | Desheng Kong",
  description: "Historical e-commerce frontend project covering product browsing, cart interaction and enquiries.",
  path: "/projects/ezisight-ecommerce",
  type: "article",
});

export default function HistoricalProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
