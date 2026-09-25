"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { WorkoutProvider, useWorkout, Workout } from "@/context/WorkoutContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ToastContainer } from "@/components/ToastContainer";
import {
  ArrowLeft,
  Plus,
  Bookmark,
  Check,
  Clock,
  Flame,
  Star,
  Dumbbell,
  AlertCircle,
  Loader2,
  Calendar,
} from "lucide-react";

function WorkoutDetailContent({ id }: { id: string }) {
  const router = useRouter();
  const { plan, saved, addToPlan, addToSaved } = useWorkout();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgError, setImgError] = useState(false);

  const fallbackImg = "/images/hero-machine.svg";

  useEffect(() => {
    async function fetchWorkoutDetail() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`);
        if (!res.ok) {
          throw new Error("Workout details not found");
        }
        const data = await res.json();
        setWorkout(data);
      } catch (err: any) {
        console.error("Error fetching detail:", err);
        setError(err.message || "Failed to load workout details");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchWorkoutDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 text-[#ccff00]">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-gray-400 font-semibold tracking-wide text-sm">
          Loading workout specs...
        </p>
      </div>
    );
  }

  if (error || !workout) {
    return (
      <div className="max-w-2xl mx-auto my-16 px-4 text-center">
        <div className="p-8 bg-[#121721] border border-red-500/30 rounded-3xl flex flex-col items-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-400" />
          <h2 className="text-2xl font-bold text-white">Lift Not Found</h2>
          <p className="text-gray-400 text-sm">{error || "Workout not found"}</p>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-[#ccff00] text-black font-extrabold uppercase text-xs tracking-wider hover:bg-[#b8e600] transition-colors"
          >
            Back to Library
          </Link>
        </div>
      </div>
    );
  }

  const isInPlan = plan.some((w) => w.id === workout.id);
  const isSaved = saved.some((w) => w.id === workout.id);
  const isCapReached = plan.length >= 5 && !isInPlan;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Back Button */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#121721] border border-[#1e2636] text-gray-300 hover:text-white hover:border-[#ccff00]/50 text-xs font-bold uppercase tracking-wider transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#ccff00]" />
          <span>Back to workouts</span>
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Visual / Media */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#121721] border border-[#1e2636] overflow-hidden shadow-2xl flex items-center justify-center group">
            {imgError ? (
              <div className="flex flex-col items-center justify-center p-8 text-gray-400">
                <Dumbbell className="w-16 h-16 text-[#ccff00]/70 mb-3" />
                <span className="text-sm font-bold uppercase">{workout.name}</span>
              </div>
            ) : (
              <Image
                src={workout.image || fallbackImg}
                alt={workout.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                onError={() => setImgError(true)}
                priority
                unoptimized
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090c10]/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Right Column: Content Details & Specs */}
        <div className="lg:col-span-6 flex flex-col space-y-8">
          {/* Header Title & Tags */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups?.map((group) => (
                <span
                  key={group}
                  className="px-3 py-1 rounded-md bg-[#161d2a] border border-[#263248] text-[#ccff00] text-xs font-extrabold uppercase tracking-wider"
                >
                  {group}
                </span>
              ))}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white tracking-tight leading-tight">
              {workout.name}
            </h1>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specs Panel */}
          <div className="bg-[#121721] border border-[#1e2636] rounded-2xl p-6 space-y-3 shadow-lg">
            <h3 className="text-xs font-extrabold text-[#ccff00] uppercase tracking-widest border-b border-[#1b2333] pb-3">
              KEY SPECIFICATIONS
            </h3>

            <div className="divide-y divide-[#1b2333] text-sm">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">EQUIPMENT</span>
                <span className="text-white font-bold">{workout.equipment}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">DIFFICULTY</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#18202d] text-[#ccff00] text-xs font-bold uppercase border border-[#253247]">
                  {workout.difficulty}
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">SETS</span>
                <span className="text-white font-bold">{workout.sets}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">REPS</span>
                <span className="text-white font-bold">{workout.reps}</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">DURATION</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#ccff00]" />
                  {workout.duration} min
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">CALORIES</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  {workout.caloriesBurned} kcal
                </span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-gray-400 font-medium">RATING</span>
                <span className="text-white font-bold flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  {workout.rating}
                </span>
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ccff00]" />
              INSTRUCTIONS
            </h3>

            <ol className="space-y-3">
              {workout.instructions?.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-xl bg-[#121721] border border-[#1b2333]"
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#ccff00] text-black font-extrabold text-sm shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-gray-300 text-sm leading-relaxed font-medium pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Call To Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch gap-4">
            {/* Primary: Add to today's plan */}
            <button
              onClick={() => addToPlan(workout)}
              disabled={isInPlan}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-extrabold text-sm uppercase tracking-wider shadow-lg transition-all ${
                isInPlan
                  ? "bg-[#182215] text-[#ccff00] border border-[#ccff00]/40 cursor-default"
                  : isCapReached
                  ? "bg-gray-800 text-gray-400 cursor-not-allowed border border-gray-700"
                  : "bg-[#ccff00] text-black hover:bg-[#b8e600] hover:shadow-[#ccff00]/20 active:scale-95 cursor-pointer"
              }`}
            >
              {isInPlan ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Today&apos;s Plan</span>
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  <span>Add to Today&apos;s Plan</span>
                </>
              )}
            </button>

            {/* Secondary: Save for later */}
            <button
              onClick={() => addToSaved(workout)}
              disabled={isSaved}
              className={`flex-1 flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-sm uppercase tracking-wider border transition-all ${
                isSaved
                  ? "bg-[#161d2a] text-[#ccff00] border-[#ccff00]/40 cursor-default"
                  : "bg-[#121721] text-gray-200 border-[#1e2636] hover:border-[#ccff00] hover:text-[#ccff00] active:scale-95 cursor-pointer"
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? "fill-[#ccff00]" : ""}`} />
              <span>{isSaved ? "Saved for Later" : "Save for Later"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);

  return (
    <WorkoutProvider>
      <div className="min-h-screen bg-[#090c10] text-gray-100 flex flex-col selection:bg-[#ccff00] selection:text-black">
        <Navbar />
        <main className="flex-1">
          <WorkoutDetailContent id={resolvedParams.id} />
        </main>
        <Footer />
        <ToastContainer />
      </div>
    </WorkoutProvider>
  );
}
