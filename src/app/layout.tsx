import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import BackgroundFX from "@/components/BackgroundFX";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mahendiran.dev"),
  title: "Mahendiran S | Software Developer Portfolio",
  description: "Official Portfolio of Mahendiran S - Software Developer and Information Technology Student at Mahendra Engineering College. Specializing in React, Next.js, Node.js, Express, Java, Firebase & Modern Web Engineering.",
  keywords: [
    "Mahendiran S",
    "Mahendiran",
    "Software Developer",
    "Full Stack Developer",
    "Software Engineer",
    "Mahendra Engineering College",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Tamil Nadu India",
    "Portfolio"
  ],
  authors: [{ name: "Mahendiran S", url: "https://github.com/Mahendiran-S" }],
  creator: "Mahendiran S",
  publisher: "Mahendiran S",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mahendiran.dev",
  },
  openGraph: {
    title: "Mahendiran S | Software Developer Portfolio",
    description: "Building scalable, modern, and user-friendly web applications with clean code and elegant design.",
    url: "https://mahendiran.dev",
    siteName: "Mahendiran S Portfolio",
    images: [
      {
        url: "/mahendiran-profile.png",
        width: 800,
        height: 800,
        alt: "Mahendiran S - Software Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahendiran S | Software Developer Portfolio",
    description: "Building scalable, modern, and user-friendly web applications with clean code and elegant design.",
    images: ["/mahendiran-profile.png"],
    creator: "@mahendiran_dev",
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
      <body className="min-h-screen bg-[#080808] text-white selection:bg-white selection:text-black font-sans relative focus-visible:outline-none">
        <SmoothScrollProvider>
          <BackgroundFX />
          <CustomCursor />
          <div className="relative z-10 overflow-x-hidden">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
