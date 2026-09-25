"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Workout } from "@/context/WorkoutContext";
import { WorkoutCard } from "@/components/WorkoutCard";
import { ChevronDown, Search, ArrowUpDown, RefreshCw, AlertCircle } from "lucide-react";

type SortOption = "duration" | "calories" | "rating";

export function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("duration");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
        if (!res.ok) {
          throw new Error(`Failed to fetch workouts (${res.status})`);
        }
        const data = await res.json();
        setWorkouts(data);
      } catch (err: any) {
        console.error("Error fetching library workouts:", err);
        setError("Unable to load workout library. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, []);

  // Filtered & Sorted Workouts
  const processedWorkouts = useMemo(() => {
    let result = [...workouts];

    // Search Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Sort Logic
    result.sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

    return result;
  }, [workouts, searchQuery, sortBy]);

  return (
    <section id="library" className="w-full py-16 sm:py-20 bg-[#090c10] border-b border-[#1b2230]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          {/* Section Heading */}
          <div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
              THE LIBRARY
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Controls: Search & Sort Dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search lifts or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#121721] border border-[#1e2636] focus:border-[#ccff00] text-sm text-white placeholder-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* C1 - Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#121721] border border-[#1e2636] hover:border-[#ccff00]/50 text-sm font-semibold text-white transition-colors"
              >
                <ArrowUpDown className="w-4 h-4 text-[#ccff00]" />
                <span>
                  Sort By:{" "}
                  <strong className="text-[#ccff00] capitalize">
                    {sortBy === "duration" ? "Duration" : sortBy === "calories" ? "Calories" : "Rating"}
                  </strong>
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    isSortMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isSortMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#121721] border border-[#20293a] rounded-xl shadow-2xl py-2 z-30 animate-in fade-in zoom-in-95">
                  {(["duration", "calories", "rating"] as SortOption[]).map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setIsSortMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
                        sortBy === option
                          ? "bg-[#ccff00]/10 text-[#ccff00] font-bold"
                          : "text-gray-300 hover:bg-[#1a2130] hover:text-white"
                      }`}
                    >
                      <span className="capitalize">{option}</span>
                      {sortBy === option && (
                        <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Loading State Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#121722] border border-[#1e2738] rounded-2xl p-4 flex flex-col space-y-4 animate-pulse"
              >
                <div className="w-full aspect-[4/3] bg-[#1a2130] rounded-xl" />
                <div className="h-6 bg-[#1a2130] rounded w-3/4" />
                <div className="h-4 bg-[#1a2130] rounded w-1/2" />
                <div className="h-4 bg-[#1a2130] rounded w-full pt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="p-8 rounded-2xl bg-[#16131a] border border-red-500/30 text-center flex flex-col items-center space-y-4 max-w-md mx-auto my-8">
            <AlertCircle className="w-12 h-12 text-red-400" />
            <p className="text-gray-300 text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Workouts 3x4 Grid */}
        {!loading && !error && (
          <>
            {processedWorkouts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {processedWorkouts.map((workout) => (
                  <WorkoutCard key={workout.id} workout={workout} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#121721] rounded-2xl border border-[#1e2636]">
                <p className="text-gray-400 text-base font-semibold">
                  No lifts match your search &quot;{searchQuery}&quot;
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#ccff00]/10 text-[#ccff00] text-xs font-bold uppercase tracking-wider"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
