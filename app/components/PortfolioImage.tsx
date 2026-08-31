"use client";

import { useState } from "react";

export default function PortfolioImage({ src, alt, className, eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className={["image-unavailable", className].filter(Boolean).join(" ")} role="img" aria-label={`${alt}. Illustration unavailable.`}>Illustration unavailable.</span>;
  // Approved local concept assets need no remote optimizer or service.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} loading={eager ? "eager" : "lazy"} decoding="async" onError={() => setFailed(true)} />;
}
