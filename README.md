<<<<<<< HEAD
# Public Care Portal - Grievance & Feedback Management Application

A production-quality, accessible, and responsive Grievance & Feedback Management application built using **Next.js (App Router)**, **React 18+**, **TypeScript**, **Material UI (MUI)**, **Zod**, and **Capacitor**. 

This application functions as:
1. **A responsive web application**
2. **A native Android application (APK)** powered by Capacitor

---

## 🏛️ Project Overview & Design Philosophy

The application is specifically engineered for **elderly users**, **non-technical citizens**, **government public-service offices**, and **first-time smartphone users**. 

### Core UI/UX Design Principles:
* **Very Clean Layout**: Large, calm sections with generous padding and vertical spacing. No cramped grids or complex dashboards.
* **Large Typography**: Text sizes are optimized for readability.
* **Large Touch Targets**: All buttons, inputs, and list elements have a minimum height of `48px` to `52px` for comfortable tapping.
* **Highly Visually Segmented Priorities**: Clear HSL-based colors highlight important information (e.g. status tags and priorities) instead of distracting gradients or neon indicators.
* **Single Column Focus**: Interfaces are kept minimal and uncluttered, preventing cognitive overload.

---

## ✨ Features

1. **Dashboard**: Summary metrics showing total, open, in-progress, and resolved items with a dominant **"Submit New Grievance"** action.
2. **Submit Grievance Form**: A full Zod-validated input schema (Full Name, Email, Phone, Subject, Category, Priority, and Description) with friendly, polite error messages. Generates a unique Ticket ID (e.g. `GRV-1004`) displayed inside a clear success modal.
3. **View All Grievances**: A responsive table layout for desktop and stacked interactive cards for mobile. Includes instant search by subject/name/ID, filtering by category, and sorting.
4. **Grievance Detail & Action Page**: Displays complete ticket logs, submitter contact info, and an administrative dropdown to instantly update the status of the grievance (Open ➡️ In Progress ➡️ Resolved).
5. **Dark Mode Toggle**: Persistent custom light/dark theme registry.
6. **Capacitor Mobile Shell**: Full Android safe-area bounds configuration and **hardware physical back-button handling** (root exits app, subpages pop browser history).
7. **Dual Storage Layer**: Reads/writes from Next.js REST API routes on web, and automatically falls back to secure `localStorage` inside Capacitor mobile shells to run fully offline.

---

## 🛠️ Technology Stack

* **Framework**: Next.js 15 (App Router, Strict Mode)
* **Language**: TypeScript (Strict Mode)
* **Styling**: Material UI (MUI v5/v6) & Emotion Engine
* **Form Logic**: React Hook Form & Zod Schema Validation
* **Native Shell**: Capacitor Core, CLI, Android, and App Native Plugins

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── api/
│   │   └── grievances/
│   │       ├── route.ts         # GET & POST Web Endpoint
│   │       └── [id]/
│   │           └── route.ts     # GET & PUT Web Endpoint
│   ├── page.tsx                 # Dashboard Page
│   ├── submit/
│   │   └── page.tsx             # Submit Form Page
│   ├── grievances/
│   │   ├── page.tsx             # View All List Page
│   │   └── [id]/
│   │       └── page.tsx         # Detail & Status Update Page
│   └── layout.tsx               # Root App Layout, Metadata & Viewport Fit
├── components/
│   ├── Layout.tsx               # Responsive Header, Bottom Nav & Safe Area Wrappers
│   ├── EmptyState.tsx           # Search/Filter Empty Page Illustration
│   └── ThemeRegistry.tsx        # Light/Dark Theme Preference Context
├── hooks/
│   └── useHardwareBackButton.ts # Capacitor Android physical back action handler
├── services/
│   └── grievanceService.ts      # Dual-mode Client API client with Offline fallback
├── lib/
│   ├── zodSchemas.ts            # Form schema & accessible custom validation messages
│   └── serverDb.ts              # Local JSON server-side persistent database
├── types/
│   └── grievance.ts             # Global TypeScript Types & Interfaces
├── utils/
│   └── platform.ts              # Capacitor Shell environment detection
└── theme/
    └── theme.ts                 # Accessible accessible Palette and Typography overrides
```

---

## 🚀 Setup & Local Execution

### 1. Prerequisite Installations
* Node.js (v18.x or higher, v24 recommended)
* npm (v9.x or higher)
* Android Studio (with SDK 30+ installed for Android builds)

### 2. Installation
Navigate to the project root directory and install dependencies:
```bash
npm install
```

### 3. Run Locally (Next.js Web Mode)
Start the Next.js development server:
```bash
npm run dev
```
Open your browser and navigate to: [http://localhost:3000](http://localhost:3000).

When running as a web app, data is persisted to a server database file inside `src/lib/db.json`. Restarts will not wipe your data.

---

## 📱 Mobile App (Android APK) Build Steps

To build the native Android application shell via Capacitor:

### 1. Compile and Export Static Next.js Assets
Capacitor requires a static folder containing compiled HTML, CSS, and JS files. Next.js is preconfigured with `output: 'export'` inside `next.config.ts`.
Compile the static build:
```bash
npm run build
```
This command generates a compiled web folder inside the `/out` directory.

### 2. Synchronize Assets with Capacitor
Sync the `/out` directory assets into the Android native source directories:
```bash
npx cap sync
```

### 3. Open Project in Android Studio
Launch Android Studio with the generated project:
```bash
npx cap open android
```

### 4. Generate the APK
Inside Android Studio:
1. Wait for Gradle sync to complete successfully.
2. In the top toolbar, go to **Build** ➡️ **Build Bundle(s) / APK(s)** ➡️ **Build APK(s)**.
3. Once completed, a notification will appear on the bottom right. Click **Locate** to retrieve the built debug APK (`app-debug.apk`).
4. Copy this file onto any Android smartphone and install it!

---

## 💡 Assumptions Made

1. **Client-Side Offline First**: In Android mobile shell contexts, a Next.js server does not run locally inside the APK. Thus, the client-side `grievanceService.ts` checks `isCapacitorPlatform()`. If true (or if local fetch calls fail), it read/writes directly from/to `localStorage`. This guarantees the APK works fully offline and preserves submitted grievances across app restarts.
2. **Server-Side Web Persistence**: When accessed via a desktop browser running the Next.js node server, we store data in `src/lib/db.json` so that server restarts don't wipe submitted grievances.
3. **No Heavy Animation Assets**: To align with elderly accessibility constraints, all page and status changes are clean, swift, and standard, avoiding heavy visual motions that can trigger disorientation.
=======
# grievance-management-portal
>>>>>>> 3999319299155d7b21d13b880bd9a2e942213d03
