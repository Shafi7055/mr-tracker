"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { WorkoutProvider, useWorkout } from "@/context/WorkoutContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ToastContainer";
import {
  Calendar,
  Bookmark,
  CheckCircle2,
  X,
  Eye,
  Clock,
  Flame,
  Star,
  Dumbbell,
  Loader2,
  ArrowRight,
  Flame as FlameIcon,
} from "lucide-react";

type ActiveTab = "today" | "saved";

function MyPlanContent() {
  const {
    plan,
    saved,
    completedIds,
    removeFromPlan,
    removeFromSaved,
    toggleCompleted,
  } = useWorkout();

  const [activeTab, setActiveTab] = useState<ActiveTab>("today");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state for list rendering
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // Calculate Live Metrics for Today's Plan
  const totalExercises = plan.length;
  const totalMinutes = plan.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const totalCalories = plan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

  const currentList = activeTab === "today" ? plan : saved;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      {/* Title & Subtitle */}
      <div className="mb-10">
        <h1 className="font-display text-4xl sm:text-6xl font-extrabold uppercase text-white tracking-tight">
          MY PLAN
        </h1>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 Stat Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Exercises */}
        <div className="bg-[#121721] border border-[#1e2636] rounded-2xl p-6 flex flex-col justify-between space-y-2 shadow-lg hover:border-[#ccff00]/40 transition-colors">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            EXERCISES
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-5xl font-extrabold text-[#ccff00]">
              {totalExercises}
            </span>
            <span className="text-xs text-gray-400 font-semibold">/ 5 Cap</span>
          </div>
        </div>

        {/* Card 2: Minutes */}
        <div className="bg-[#121721] border border-[#1e2636] rounded-2xl p-6 flex flex-col justify-between space-y-2 shadow-lg hover:border-[#ccff00]/40 transition-colors">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            MINUTES
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-5xl font-extrabold text-white">
              {totalMinutes}
            </span>
            <Clock className="w-6 h-6 text-[#ccff00]" />
          </div>
        </div>

        {/* Card 3: Calories */}
        <div className="bg-[#121721] border border-[#1e2636] rounded-2xl p-6 flex flex-col justify-between space-y-2 shadow-lg hover:border-[#ccff00]/40 transition-colors">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">
            CALORIES
          </span>
          <div className="flex items-baseline justify-between">
            <span className="font-display text-5xl font-extrabold text-white">
              {totalCalories}
            </span>
            <FlameIcon className="w-6 h-6 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Tabs Header */}
      <div className="flex items-center gap-4 border-b border-[#1e2636] mb-8 pb-4">
        <button
          onClick={() => setActiveTab("today")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
            activeTab === "today"
              ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
              : "bg-[#121721] text-gray-400 hover:text-white border border-[#1e2636]"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Today&apos;s Plan</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-extrabold bg-black/20 text-current">
            {plan.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all ${
            activeTab === "saved"
              ? "bg-[#ccff00] text-black shadow-lg shadow-[#ccff00]/20"
              : "bg-[#121721] text-gray-400 hover:text-white border border-[#1e2636]"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
          <span className="ml-1 px-2 py-0.5 rounded-full text-xs font-extrabold bg-black/20 text-current">
            {saved.length}
          </span>
        </button>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="py-20 flex flex-col items-center justify-center space-y-3 text-[#ccff00]">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-gray-400 text-sm font-semibold">Loading workouts…</p>
        </div>
      )}

      {/* Main List & Empty State */}
      {!isLoading && (
        <>
          {currentList.length > 0 ? (
            <div className="space-y-4">
              {currentList.map((workout) => {
                const isDone = completedIds.includes(workout.id);

                return (
                  <div
                    key={workout.id}
                    className={`group bg-[#121721] border rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all ${
                      isDone
                        ? "border-emerald-500/40 bg-[#0e1614]/80 opacity-85"
                        : "border-[#1e2636] hover:border-[#ccff00]/50"
                    }`}
                  >
                    {/* Left: Thumbnail & Main Info */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-[#090c10] overflow-hidden shrink-0 border border-[#1e2636]">
                        <Image
                          src={workout.image || "/images/hero-machine.svg"}
                          alt={workout.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                          unoptimized
                        />
                        {isDone && (
                          <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs flex items-center justify-center">
                            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-display text-lg sm:text-xl font-bold uppercase ${
                              isDone ? "line-through text-gray-400" : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h3>
                          {isDone && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              DONE
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-400 font-medium">
                          Equipment: <span className="text-gray-300 font-semibold">{workout.equipment}</span>
                        </p>

                        {/* Stats Row */}
                        <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 pt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
                            {workout.duration} min
                          </span>
                          <span className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-orange-400" />
                            {workout.caloriesBurned} kcal
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                            {workout.rating}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3 self-end md:self-center">
                      {/* View Details button */}
                      <Link
                        href={`/workout/${workout.id}`}
                        className="px-4 py-2.5 rounded-xl bg-[#1a2130] border border-[#263248] text-gray-200 hover:text-white hover:border-[#ccff00]/50 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
                      >
                        <Eye className="w-4 h-4 text-[#ccff00]" />
                        <span>View Details</span>
                      </Link>

                      {/* C3 - Mark as Done button */}
                      <button
                        onClick={() => toggleCompleted(workout.id)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                          isDone
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30"
                            : "bg-[#ccff00] text-black hover:bg-[#b8e600] shadow-md shadow-[#ccff00]/15"
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isDone ? "Completed" : "Mark as Done"}</span>
                      </button>

                      {/* C3 - Remove (X) button */}
                      <button
                        onClick={() =>
                          activeTab === "today"
                            ? removeFromPlan(workout.id)
                            : removeFromSaved(workout.id)
                        }
                        className="p-2.5 rounded-xl bg-[#1a2130] border border-[#263248] text-gray-400 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-colors"
                        title="Remove lift"
                        aria-label="Remove workout"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty State Container */
            <div className="py-20 px-6 bg-[#121721] border border-[#1e2636] rounded-3xl text-center flex flex-col items-center justify-center space-y-5 max-w-xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-[#161d2a] border border-[#263248] flex items-center justify-center text-[#ccff00] shadow-inner">
                <Dumbbell className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-2xl font-extrabold uppercase text-white tracking-wider">
                  NOTHING HERE YET
                </h3>
                <p className="text-gray-400 text-sm max-w-md">
                  {activeTab === "today"
                    ? "Browse the library and add a lift to get today moving."
                    : "Save exercises to your wishlist for upcoming workout sessions."}
                </p>
              </div>

              <Link
                href="/"
                className="mt-2 inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#b8e600] shadow-lg shadow-[#ccff00]/20 transition-all active:scale-95"
              >
                <span>Go to workouts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function MyPlanPage() {
  return (
    <WorkoutProvider>
      <div className="min-h-screen bg-[#090c10] text-gray-100 flex flex-col selection:bg-[#ccff00] selection:text-black">
        <Navbar />
        <main className="flex-1">
          <MyPlanContent />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </WorkoutProvider>
  );
}
