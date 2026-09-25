"use client";

import React from "react";
import Link from "next/link";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Dumbbell, Home } from "lucide-react";

export default function NotFound() {
  return (
    <WorkoutProvider>
      <div className="min-h-screen bg-[#090c10] text-gray-100 flex flex-col selection:bg-[#ccff00] selection:text-black">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-3xl bg-[#121721] border border-[#1e2636] flex items-center justify-center text-[#ccff00] shadow-2xl">
              <Dumbbell className="w-12 h-12" />
            </div>
            <span className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 font-extrabold text-xs uppercase">
              404
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
            PAGE NOT FOUND
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mt-3 mb-8">
            The lift or routine you are looking for has been moved or doesn&apos;t exist. Let&apos;s get back to today&apos;s workout.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] shadow-lg shadow-[#ccff00]/20 transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>Return to Library</span>
          </Link>
        </main>
        <Footer />
      </div>
    </WorkoutProvider>
  );
}
