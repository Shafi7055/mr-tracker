"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Workout } from "@/context/WorkoutContext";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";

export function WorkoutCard({ workout }: { workout: Workout }) {
  const [imgError, setImgError] = useState(false);

  // Fallback visual illustration if external remote image fails
  const fallbackImg = "/images/hero-machine.svg";

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group relative flex flex-col bg-[#121722] border border-[#1e2738] hover:border-[#ccff00]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-[#ccff00]/5 hover:-translate-y-1"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] bg-[#0d111a] overflow-hidden flex items-center justify-center">
        {imgError ? (
          <div className="flex flex-col items-center justify-center p-6 text-gray-500">
            <Dumbbell className="w-12 h-12 mb-2 text-[#ccff00]/60" />
            <span className="text-xs font-semibold uppercase">{workout.name}</span>
          </div>
        ) : (
          <Image
            src={workout.image || fallbackImg}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            unoptimized
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121722] via-transparent to-transparent opacity-80" />

        {/* Category Tag Pills (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="px-2.5 py-1 rounded-md bg-[#090c10]/80 backdrop-blur-md border border-[#232d3f] text-[#ccff00] text-[10px] font-extrabold uppercase tracking-wider shadow-sm"
            >
              {group}
            </span>
          ))}
        </div>
      </div>

      {/* Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Workout Name */}
          <h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-[#ccff00] transition-colors leading-tight">
            {workout.name}
          </h3>

          {/* Equipment Line */}
          <p className="text-xs text-gray-400 font-medium mt-1 flex items-center gap-1.5">
            <span className="text-gray-500">Equipment:</span>
            <span className="text-gray-300 font-semibold">{workout.equipment}</span>
          </p>
        </div>

        {/* Stats Row */}
        <div className="pt-3 border-t border-[#1b2333] flex items-center justify-between text-xs font-semibold text-gray-300">
          {/* Duration */}
          <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Duration">
            <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
            <span>{workout.duration} min</span>
          </div>

          {/* Calories */}
          <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Calories Burned">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1.5 hover:text-white transition-colors" title="Rating">
            <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>{workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
