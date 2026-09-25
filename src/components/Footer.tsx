"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#07090d] border-t border-[#1a202c] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[#121721] border border-[#202736] group-hover:border-[#ccff00] transition-colors">
            <Image
              src="/images/logo.svg"
              alt="FitLog Logo"
              width={16}
              height={16}
              className="w-4 h-4"
            />
          </div>
          <span className="font-display text-lg tracking-wider font-extrabold text-white group-hover:text-[#ccff00] transition-colors">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-xs text-gray-400 font-medium text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
