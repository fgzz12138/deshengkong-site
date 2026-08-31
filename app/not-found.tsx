import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="site-shell error-page"><p className="eyebrow">404 · Page not found</p><h1>This page isn’t here.</h1><p>The link may be out of date, or the address may be incorrect. You can find current and earlier work in the project collection.</p><Link href="/projects" className="button button-primary">Explore projects<ArrowRight aria-hidden="true" /></Link></main>;
}
