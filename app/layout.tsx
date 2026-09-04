import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "./components/Header";
import SiteFooter from "./components/SiteFooter";
import { createPageMetadata, SITE_ORIGIN } from "./content/site-metadata";

export const metadata: Metadata = {
  ...createPageMetadata({
    title: "Desheng Kong — Applied AI & Practical Systems",
    description: "Applied AI systems across knowledge retrieval, voice interfaces and workflow automation, with clear boundaries and maintainable product interfaces.",
    path: "/",
  }),
  metadataBase: new URL(SITE_ORIGIN),
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><a className="skip-link" href="#main-content">Skip to content</a><Header />{children}<SiteFooter /></body></html>;
}
