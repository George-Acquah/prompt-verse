import type { Metadata } from "next";
import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PWARegistration from "@/components/registerPwa";
import Providers from "./providers";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CraftPrompt",
    default: "CraftPrompt",
  },
  description: "Explore, create and share your favourite AI prompts.",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next15", "pwa", "prompt"],
    authors: [
    {
      name: "George Acquah",
      url: "https://www.linkedin.com/in/george-acquah-993788248",
    },
    {
      name: "George Acquah",
      url: "https://github.com/George-Acquah",
    },
  ],
  verification: {
    google: "byRodQOk14JQ3yfRZpAkU2JAJHjWixe8q23_oOIq-Us" 
  } 
};

const ToastHandler = dynamic(
  () => import("@/components/toastHandler").then((mod) => mod.ToastHandler),
  {
    loading: () => null,
  }
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} antialiased`}>
        <Providers attribute="class" enableSystem disableTransitionOnChange>
        <Toaster />
        <Suspense>
          <ToastHandler />
        </Suspense>
        <div className="main">
          <div className="gradient" />
        </div>
        {children}
        
        </Providers>
        <PWARegistration />
      </body>
    </html>
  );
}
