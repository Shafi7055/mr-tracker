# FitLog — Workout Library & Gym Companion 🏋️‍♂️

FitLog is a dark, no-nonsense gym companion app built with **Next.js (App Router)**, **React**, and **Tailwind CSS**. It provides a sleek, high-contrast workout library where users can browse exercises, view key specifications, lock lifts into today's plan, track live exercise metrics, and mark sets as completed.

---

## 🌟 Key Features (Minimum 5)

1. **Dynamic Workout Library & Multi-Criteria Sorting (C1)**  
   Displays exercise cards in a responsive 3x4 grid fetched live from the FitLog API. Supports instant sorting by **Duration**, **Calories Burned**, or **Rating**, alongside search filtering by exercise name or targeted muscle group tags.

2. **Detailed Exercise Specifications & Step-by-Step Instructions**  
   Dedicated Workout Detail pages (`/workout/[id]`) featuring a two-column media layout, key specs panel (Equipment, Difficulty, Sets, Reps, Duration, Calories, Rating), and an ordered step-by-step instruction guide.

3. **Today's Plan & Saved Wishlist Management with 5-Lift Daily Cap**  
   Add workouts directly to **Today's Plan** or **Save for Later**. Enforces a daily cap of **5 exercises** to keep daily workouts focused and actionable.

4. **Live Metrics Summary Counter**  
   The `/my-plan` dashboard displays dynamic stat summary cards (**Exercises**, **Minutes**, **Calories**) that update instantly as items are added, marked as completed, or removed.

5. **LocalStorage State Persistence & Interactive Toast Notifications**  
   All plan items, saved workouts, and completed statuses persist across browser refreshes using `localStorage`. Instant floating toast feedback notifies users whenever items are added, saved, completed, or removed.

6. **Responsive Figma-Matched Dark UI & Custom 404 Route**  
   Tailored gym visual theme with neon lime (`#ccff00`) accents, custom navbar status badges (`Plan` and `Saved` counters), mobile drawer menu, footer, and a styled 404 page for unknown routes.

---

## 🛠️ Technologies Used

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS v4 & Custom Utility Tokens
- **Icons**: Lucide React
- **API**: [FitLog Worker API](https://api.abcz.workers.dev/api/fitlog)
- **State & Persistence**: React Context API & `localStorage`
- **Version Control**: Git & GitHub

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Shafi7055/mr-tracker.git
   cd mr-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000`

---

## 📱 Navigation & Routes

| Route | Description |
| :--- | :--- |
| `/` | Home page featuring Hero Banner, `#library` anchor scroll, search, and sorting grid. |
| `/workout/[id]` | Workout details page with image, key specs table, instructions, and CTA buttons. |
| `/my-plan` | Plan dashboard with live metrics summary row, Today's Plan / Saved tabs, and item controls. |
| `/*` | Custom 404 page for invalid or non-existent routes. |

---

## 📜 License

© 2026 FitLog — Workout Library. Train hard, log honest.
