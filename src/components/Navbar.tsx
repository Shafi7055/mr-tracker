"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useWorkout } from "@/context/WorkoutContext";
import { Dumbbell, Menu, X, Calendar, Bookmark } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutActive = pathname === "/" || pathname.startsWith("/workout");
  const isMyPlanActive = pathname === "/my-plan";

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090c10]/90 backdrop-blur-md border-b border-[#1e2636] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#161b26] border border-[#263147] group-hover:border-[#ccff00] transition-colors shadow-md">
            <Image
              src="/images/logo.svg"
              alt="FitLog Logo"
              width={22}
              height={22}
              className="w-5 h-5 group-hover:scale-110 transition-transform"
            />
          </div>
          <span className="font-display text-2xl tracking-wider font-extrabold text-white group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Middle: Nav Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-2 bg-[#121721] p-1.5 rounded-full border border-[#1e2636]">
          <Link
            href="/"
            className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20 font-bold"
                : "text-gray-400 hover:text-white hover:bg-[#1a202c]"
            }`}
          >
            Workout
          </Link>
          <Link
            href="/my-plan"
            className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black shadow-md shadow-[#ccff00]/20 font-bold"
                : "text-gray-400 hover:text-white hover:bg-[#1a202c]"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Right: Status Badges (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Plan badge (filled pill) */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[#ccff00] text-black font-bold text-xs tracking-wider uppercase hover:brightness-110 hover:scale-105 active:scale-95 transition-all shadow-md shadow-[#ccff00]/15"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Plan {plan.length}</span>
          </Link>

          {/* Saved badge (outline pill) */}
          <Link
            href="/my-plan"
            className="group flex items-center gap-2 px-4 py-2 rounded-full border-2 border-[#ccff00]/70 text-[#ccff00] font-bold text-xs tracking-wider uppercase hover:bg-[#ccff00]/10 hover:border-[#ccff00] hover:scale-105 active:scale-95 transition-all"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved {saved.length}</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase"
          >
            <span>Plan {plan.length}</span>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#121721] border border-[#1e2636] text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e121a] border-b border-[#1e2636] px-4 py-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl font-semibold transition-colors flex items-center justify-between ${
              isWorkoutActive
                ? "bg-[#ccff00] text-black font-bold"
                : "text-gray-300 hover:bg-[#161b26]"
            }`}
          >
            <span>Workout Library</span>
            <Dumbbell className="w-5 h-5" />
          </Link>

          <Link
            href="/my-plan"
            onClick={() => setMobileMenuOpen(false)}
            className={`px-4 py-3 rounded-xl font-semibold transition-colors flex items-center justify-between ${
              isMyPlanActive
                ? "bg-[#ccff00] text-black font-bold"
                : "text-gray-300 hover:bg-[#161b26]"
            }`}
          >
            <span>My Plan</span>
            <Calendar className="w-5 h-5" />
          </Link>

          <div className="pt-2 border-t border-[#1e2636] flex items-center justify-around gap-2">
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-full bg-[#ccff00] text-black font-bold text-center text-xs tracking-wider uppercase"
            >
              Plan ({plan.length})
            </Link>
            <Link
              href="/my-plan"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2.5 rounded-full border border-[#ccff00] text-[#ccff00] font-bold text-center text-xs tracking-wider uppercase"
            >
              Saved ({saved.length})
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
