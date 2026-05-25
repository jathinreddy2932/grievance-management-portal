import { Grievance } from '@/types/grievance';

// ============================================================
// src/lib/store.ts — Shared In-Memory Data Store
//
// Single source of truth for both API routes:
//   - /api/grievances         (GET, POST)
//   - /api/grievances/[id]    (GET, PATCH)
//
// Uses a module-level variable so all API route handlers in
// the same Node.js process share the same data. Data persists
// for the lifetime of the server process.
//
// NOTE: This is a mock store for demonstration purposes.
// In production, replace with a real database (e.g. PostgreSQL,
// MongoDB, Prisma ORM, or Firebase Firestore).
// ============================================================

const seedData: Grievance[] = [
  {
    id: 'GRV-1001',
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@email.com',
    phone: '9876543210',
    subject: 'Street light not working in Sector 4',
    category: 'Complaint',
    priority: 'High',
    description:
      'The street light near House 412 has been broken for over two weeks. It gets very dark in the evening, making it unsafe for elders to walk.',
    status: 'Open',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'GRV-1002',
    fullName: 'Saraswathi Amma',
    email: 'saraswathi.a@email.com',
    phone: '9845123456',
    subject: 'Feedback on new senior citizen pension portal',
    category: 'Feedback',
    priority: 'Medium',
    description:
      'The new web portal is very simple and easy to use. The large fonts make reading effortless. Thank you for making it accessible.',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'GRV-1003',
    fullName: 'John David',
    email: 'john.david@email.com',
    phone: '9765432109',
    subject: 'Suggestion for public park benches',
    category: 'Suggestion',
    priority: 'Low',
    description:
      'Please install more benches with back support in the Central park. Many elderly citizens visit in the morning and need spots to rest.',
    status: 'In Progress',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Module-level store — shared across all API route handlers
export const store = {
  grievances: [...seedData] as Grievance[],

  getAll(): Grievance[] {
    return this.grievances;
  },

  getById(id: string): Grievance | undefined {
    return this.grievances.find((g) => g.id === id);
  },

  create(grievance: Grievance): Grievance {
    this.grievances = [grievance, ...this.grievances];
    return grievance;
  },

  updateStatus(id: string, status: Grievance['status']): Grievance | null {
    const index = this.grievances.findIndex((g) => g.id === id);
    if (index === -1) return null;
    this.grievances[index] = { ...this.grievances[index], status };
    return this.grievances[index];
  },

  nextId(): string {
    const max =
      this.grievances.length > 0
        ? Math.max(
            ...this.grievances.map((g) =>
              parseInt(g.id.replace('GRV-', ''), 10)
            )
          )
        : 1000;
    return `GRV-${max + 1}`;
  },
};
