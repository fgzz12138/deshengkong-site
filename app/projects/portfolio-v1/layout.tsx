import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../../content/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Portfolio v1 | Desheng Kong",
  description: "An earlier version of this portfolio, with its original design and development write-up.",
  path: "/projects/portfolio-v1",
  type: "article",
});

export default function HistoricalProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
