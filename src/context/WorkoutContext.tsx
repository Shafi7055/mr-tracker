"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface ToastMessage {
  id: string;
  text: string;
  type: "success" | "info" | "warning";
}

interface WorkoutContextType {
  plan: Workout[];
  saved: Workout[];
  completedIds: number[];
  toasts: ToastMessage[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (id: number) => void;
  addToSaved: (workout: Workout) => void;
  removeFromSaved: (id: number) => void;
  toggleCompleted: (id: number) => void;
  showToast: (text: string, type?: "success" | "info" | "warning") => void;
  removeToast: (id: string) => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const LOCAL_PLAN_KEY = "fitlog_today_plan";
const LOCAL_SAVED_KEY = "fitlog_saved_workouts";
const LOCAL_DONE_KEY = "fitlog_completed_ids";

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem(LOCAL_PLAN_KEY);
      const savedSaved = localStorage.getItem(LOCAL_SAVED_KEY);
      const savedDone = localStorage.getItem(LOCAL_DONE_KEY);

      if (savedPlan) setPlan(JSON.parse(savedPlan));
      if (savedSaved) setSaved(JSON.parse(savedSaved));
      if (savedDone) setCompletedIds(JSON.parse(savedDone));
    } catch (e) {
      console.error("Failed to load fitlog state from localStorage", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(LOCAL_PLAN_KEY, JSON.stringify(plan));
      localStorage.setItem(LOCAL_SAVED_KEY, JSON.stringify(saved));
      localStorage.setItem(LOCAL_DONE_KEY, JSON.stringify(completedIds));
    } catch (e) {
      console.error("Failed to save fitlog state to localStorage", e);
    }
  }, [plan, saved, completedIds, isLoaded]);

  const showToast = (text: string, type: "success" | "info" | "warning" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToPlan = (workout: Workout): boolean => {
    if (plan.some((w) => w.id === workout.id)) {
      showToast(`"${workout.name}" is already in today's plan!`, "info");
      return false;
    }
    if (plan.length >= 5) {
      showToast("Daily cap reached (Max 5 lifts). Finish current lifts first!", "warning");
      return false;
    }
    setPlan((prev) => [...prev, workout]);
    showToast(`Added "${workout.name}" to today's plan!`, "success");
    return true;
  };

  const removeFromPlan = (id: number) => {
    const found = plan.find((w) => w.id === id);
    setPlan((prev) => prev.filter((w) => w.id !== id));
    if (found) {
      showToast(`Removed "${found.name}" from today's plan`, "info");
    }
  };

  const addToSaved = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      showToast(`"${workout.name}" is already in saved list!`, "info");
      return;
    }
    setSaved((prev) => [...prev, workout]);
    showToast(`Saved "${workout.name}" for later!`, "success");
  };

  const removeFromSaved = (id: number) => {
    const found = saved.find((w) => w.id === id);
    setSaved((prev) => prev.filter((w) => w.id !== id));
    if (found) {
      showToast(`Removed "${found.name}" from saved list`, "info");
    }
  };

  const toggleCompleted = (id: number) => {
    const workout = plan.find((w) => w.id === id) || saved.find((w) => w.id === id);
    setCompletedIds((prev) => {
      const isDone = prev.includes(id);
      if (isDone) {
        if (workout) showToast(`Marked "${workout.name}" as pending`, "info");
        return prev.filter((i) => i !== id);
      } else {
        if (workout) showToast(`Great job! Marked "${workout.name}" as done! 🎉`, "success");
        return [...prev, id];
      }
    });
  };

  return (
    <WorkoutContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        toasts,
        addToPlan,
        removeFromPlan,
        addToSaved,
        removeFromSaved,
        toggleCompleted,
        showToast,
        removeToast,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error("useWorkout must be used within a WorkoutProvider");
  }
  return context;
}
