import type { Metadata } from "next";
import type { ReactNode } from "react";
import { createPageMetadata } from "../../content/site-metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Corporate Website Development | Desheng Kong",
  description: "Historical corporate website project covering page development, feedback and business workflows.",
  path: "/projects/company-website",
  type: "article",
});

export default function HistoricalProjectLayout({ children }: { children: ReactNode }) {
  return children;
}
