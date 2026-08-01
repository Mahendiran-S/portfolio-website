import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import BackgroundFX from "@/components/BackgroundFX";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mahendiran S | Awwwards-Level Full Stack Developer",
  description: "Portfolio of Mahendiran S - Full Stack Developer and Information Technology Student at Mahendra Engineering College. Specializing in React, Next.js, Node.js, Express, Firebase & Modern Web Engineering.",
  keywords: [
    "Mahendiran S",
    "Mahendiran",
    "Full Stack Developer",
    "Software Engineer",
    "Mahendra Engineering College",
    "React Developer",
    "Next.js Developer",
    "Kwontum Intern",
    "Portfolio"
  ],
  authors: [{ name: "Mahendiran S" }],
  creator: "Mahendiran S",
  openGraph: {
    title: "Mahendiran S | Full Stack Developer",
    description: "Building scalable, modern, and user-friendly web applications with clean code and elegant design.",
    url: "https://mahendiran.dev",
    siteName: "Mahendiran S Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-[#080808] text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden">
        <SmoothScrollProvider>
          <BackgroundFX />
          <CustomCursor />
          <div className="relative z-10">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
