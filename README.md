# Public Care Portal — Grievance & Feedback Management Application

A production-quality, accessible, and responsive **Grievance & Feedback Management** application built using **Next.js (App Router)**, **React**, **TypeScript**, **Material UI (MUI)**, **Zod**, and **React Hook Form**.

---

## 🏛️ Project Overview

This application functions as an official public-service portal where citizens can file local complaints, register feedback, or share public suggestions. Every submission is tracked, categorized, and can be updated by an authorized administrator.

Designed specifically for:
- **Elderly users**
- **Non-technical citizens**
- **Public-service offices**

---

## ✨ Features

1. **Dashboard** – Summary metrics showing total, open, in-progress, and resolved grievances with a prominent **"Submit New Grievance"** call-to-action.
2. **Submit Grievance Form** – Full Zod-validated form (Full Name, Email, Phone, Subject, Category, Priority, Description) with friendly validation messages. Generates a unique Ticket ID (e.g. `GRV-1004`) shown in a success dialog.
3. **View All Grievances (`/grievances`)** – Responsive table for desktop and stacked cards for mobile. Includes live search by subject/name/ID, category filter, and sort options.
4. **Grievance Detail Page (`/grievances/[id]`)** – Full ticket view with description, metadata, submitter details, and admin-only status update controls.
5. **Admin Authorization** – Clerk-based Google login with email-based admin detection. Only the configured admin email can update ticket statuses.
6. **Dark Mode Toggle** – Persistent light/dark theme via React context.
7. **REST API Layer** – Next.js App Router API routes (`/api/grievances`) supporting GET and POST. In-memory mock storage with seeded sample data.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Full-stack framework, routing, API routes |
| **React 19** | Component library |
| **TypeScript** | Strict static typing throughout |
| **Material UI (MUI v9)** | UI component library (TextField, Button, Card, Dialog, Chip, etc.) |
| **Zod** | Form schema validation |
| **React Hook Form** | Form state management with `zodResolver` |
| **@hookform/resolvers** | Connects Zod schema to React Hook Form |
| **Clerk (NextJS)** | Authentication & Google OAuth login |
| **Emotion (React + Styled)** | CSS-in-JS engine powering MUI |

---

## 📁 Folder Structure

```
src/
├── app/
│   ├── api/
│   │   └── grievances/
│   │       ├── route.ts          # GET & POST API endpoint
│   │       └── [id]/
│   │           └── route.ts      # GET & PATCH API endpoint (by ID)
│   ├── page.tsx                  # Dashboard Page
│   ├── submit/
│   │   └── page.tsx              # Submit Form Page
│   ├── grievances/
│   │   ├── page.tsx              # View All Grievances List
│   │   └── [id]/
│   │       └── page.tsx          # Grievance Detail & Admin Update
│   └── layout.tsx                # Root Layout with ThemeRegistry & Clerk
├── components/
│   ├── Layout.tsx                # Responsive Header & Navigation
│   ├── GrievanceForm.tsx         # Zod + MUI + RHF validated submit form
│   ├── GrievanceTable.tsx        # Desktop data table
│   ├── GrievanceCardList.tsx     # Mobile card list
│   ├── StatusUpdateCard.tsx      # Admin-only status update control
│   ├── SubmitterDetailsCard.tsx  # Submitter contact display
│   ├── SuccessModal.tsx          # Post-submission ticket ID dialog
│   ├── EmptyState.tsx            # Empty/no-results UI state
│   └── ThemeRegistry.tsx         # MUI theme context provider
├── hooks/
│   └── useAdmin.ts               # Admin status hook (Clerk + email check)
├── services/
│   └── grievanceService.ts       # API client (fetch wrapper)
├── lib/
│   ├── admin.ts                  # Admin email authorization logic
│   └── zodSchemas.ts             # Zod form schema & TypeScript types
├── types/
│   └── grievance.ts              # Global TypeScript interfaces
└── theme/
    └── theme.ts                  # MUI palette & typography overrides
```

---

## 🚀 Setup & Local Execution

### Prerequisites
- Node.js v18 or higher
- npm v9 or higher

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm run start
```

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/grievances` | Fetch all submitted grievances |
| `POST` | `/api/grievances` | Submit a new grievance |
| `GET` | `/api/grievances/[id]` | Fetch a single grievance by ID |
| `PATCH` | `/api/grievances/[id]` | Update grievance status (admin only) |

---

## 💡 Assumptions & Design Decisions

1. **Mock API Storage**: The Next.js API routes use an in-memory array as the data store. Data resets on server restart. This is clearly documented as a mock backend — suitable for demonstration and assignment evaluation.

2. **Admin Authorization**: Admin access is determined by matching the logged-in Clerk user's email against a configured admin email in `src/lib/admin.ts`. No backend auth middleware is used; this is a client-side authorization pattern suitable for this scope.

3. **No Heavy Animations**: In accordance with elderly/accessibility design principles, all interactions are clean and standard — no heavy animations that can cause disorientation.

4. **Responsive Design**: The UI adapts between mobile (card layout) and desktop (table layout) breakpoints using MUI's `useMediaQuery`.

5. **Zod Validation**: All form fields are validated using Zod schemas in `src/lib/zodSchemas.ts`. Error messages are written in plain, friendly language for non-technical users.
