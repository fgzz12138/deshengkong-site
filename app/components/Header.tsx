"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";

function Navigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);
  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) { close(); toggle.current?.focus(); }
    }}>
      <div className="site-shell">
        <div className="site-header-inner">
          <Link className="site-brand" href="/" onClick={close}>Desheng Kong</Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <Link href="/#projects">Work</Link>
            <Link href="/about" aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
            <Link href="/contact" className="nav-contact" aria-current={pathname === "/contact" ? "page" : undefined}>Get in touch</Link>
          </nav>
          <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
          <Link href="/#projects" onClick={close}>Work</Link>
          <Link href="/projects" onClick={close}>All projects</Link>
          <Link href="/about" onClick={close} aria-current={pathname === "/about" ? "page" : undefined}>About</Link>
          <Link href="/contact" onClick={close} aria-current={pathname === "/contact" ? "page" : undefined}>Get in touch</Link>
        </nav>
      </div>
    </header>
  );
}
export default function Header() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}
