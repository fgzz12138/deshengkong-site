import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desheng Kong",
  description: "Portfolio of Desheng Kong",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black`}
      >
        <header className="border-b">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <a href="/" className="font-semibold">
              Desheng Kong
            </a>

            <nav className="flex gap-6 text-sm text-gray-600">
              <a href="/" className="hover:text-black">
                Home
              </a>
              <a href="/projects" className="hover:text-black">
                Projects
              </a>
              <a href="/about" className="hover:text-black">
                About
              </a>
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
