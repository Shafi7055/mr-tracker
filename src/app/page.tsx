"use client";

import React from "react";
import { WorkoutProvider } from "@/context/WorkoutContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { LibrarySection } from "@/components/LibrarySection";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ToastContainer";

export default function HomePage() {
  return (
    <WorkoutProvider>
      <div className="min-h-screen bg-[#090c10] text-gray-100 flex flex-col selection:bg-[#ccff00] selection:text-black">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <LibrarySection />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </WorkoutProvider>
  );
}
