import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Gym Companion",
  description: "Train with intent. Log every set. Pick a lift, lock it into today's plan, and watch the week's work add up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased dark`}
    >
      <body className="min-h-screen bg-[#090c10] text-gray-100 flex flex-col font-sans selection:bg-[#ccff00] selection:text-black">
        {children}
      </body>
    </html>
  );
}
