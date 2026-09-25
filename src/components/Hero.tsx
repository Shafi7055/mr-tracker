"use client";

import React from "react";
import Image from "next/image";
import { ChevronDown, Dumbbell, Flame, Zap } from "lucide-react";

export function Hero() {
  const scrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    const libraryEl = document.getElementById("library");
    if (libraryEl) {
      libraryEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full bg-gradient-to-b from-[#0e121b] via-[#0b0e15] to-[#090c10] border-b border-[#1b2230] pt-12 pb-16 md:py-20 overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -top-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161d2a] border border-[#263248] text-[#ccff00] text-xs font-bold tracking-widest uppercase shadow-sm">
              <Zap className="w-3.5 h-3.5" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
              TRAIN WITH INTENT. <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            {/* Primary CTA button */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href="#library"
                onClick={scrollToLibrary}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#b8e600] hover:shadow-lg hover:shadow-[#ccff00]/25 active:scale-95 transition-all cursor-pointer"
              >
                <Dumbbell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                <span>BROWSE WORKOUTS</span>
                <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>

              {/* Quick info stats */}
              <div className="flex items-center gap-6 px-4 py-2 text-xs text-gray-400 border-l border-[#20293a] hidden sm:flex">
                <div>
                  <span className="block text-white font-bold text-sm">12 Lifts</span>
                  <span>Full coverage</span>
                </div>
                <div>
                  <span className="block text-[#ccff00] font-bold text-sm">5 Cap</span>
                  <span>Daily limit</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Graphic Asset */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-[#141b27] to-[#0c0f16] border border-[#202b3c] p-6 shadow-2xl flex items-center justify-center group overflow-hidden">
              {/* Outer glow ring */}
              <div className="absolute inset-0 border border-[#ccff00]/20 rounded-3xl group-hover:border-[#ccff00]/40 transition-colors" />

              <Image
                src="/images/hero-machine.svg"
                alt="Gym Preacher Curl Machine Visual"
                width={400}
                height={400}
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                priority
              />

              {/* Floating feature badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0e121a]/90 backdrop-blur-md p-3 rounded-2xl border border-[#232d3f] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                  <Flame className="w-4 h-4 text-[#ccff00]" />
                  <span>Targeted Muscle Isolation</span>
                </div>
                <span className="bg-[#ccff00]/10 text-[#ccff00] px-2 py-0.5 rounded-full font-bold uppercase text-[10px]">
                  PRO
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
