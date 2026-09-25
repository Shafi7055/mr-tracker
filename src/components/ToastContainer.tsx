"use client";

import React from "react";
import { useWorkout } from "@/context/WorkoutContext";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export function ToastContainer() {
  const { toasts, removeToast } = useWorkout();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-md border transition-all duration-300 animate-in slide-in-from-bottom-5 ${
            toast.type === "success"
              ? "bg-[#121721]/95 border-[#ccff00]/60 text-white"
              : toast.type === "warning"
              ? "bg-[#1f1910]/95 border-amber-500/60 text-amber-200"
              : "bg-[#121721]/95 border-blue-500/60 text-blue-200"
          }`}
        >
          <div className="flex items-center gap-3">
            {toast.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />
            )}
            {toast.type === "warning" && (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            {toast.type === "info" && (
              <Info className="w-5 h-5 text-blue-400 shrink-0" />
            )}
            <span className="text-sm font-medium tracking-wide">{toast.text}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-400 hover:text-white p-1 rounded-lg transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
