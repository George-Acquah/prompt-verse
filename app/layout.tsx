import type { Metadata } from "next";
import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";
// import { ToastHandler } from "@/components/toastHandler";
import { Suspense } from "react";
import dynamic from "next/dynamic";


const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "PromptVerse",
  description: "Ignite Creativity & Explore Infinite Prompts",
};

const ToastHandler = dynamic(
  () => import("@/components/toastHandler").then((mod) => mod.ToastHandler),
  {
    loading: () => <p>Loading toast...</p>,
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
        <Toaster />
        <Suspense>
          <ToastHandler />
        </Suspense>
        <div className="main">
          <div className="gradient" />
        </div>
        {children}
      </body>
    </html>
  );
}
