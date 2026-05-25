import { Grievance, GrievanceStats, GrievanceStatus } from '@/types/grievance';
import { GrievanceFormData } from '@/lib/zodSchemas';

// ============================================================
// src/services/grievanceService.ts — API Client
//
// All data operations go through the Next.js API routes:
//   GET  /api/grievances          — fetch all grievances
//   POST /api/grievances          — create a new grievance
//   GET  /api/grievances/[id]     — fetch single grievance
//   PATCH /api/grievances/[id]    — update grievance status
//
// The server-side API uses an in-memory store (src/lib/store.ts)
// which is seeded with sample data and persists for the lifetime
// of the server process.
// ============================================================

const BASE_URL = '/api/grievances';

export const grievanceService = {
  /**
   * Fetch all grievances from the API.
   */
  async getAllGrievances(): Promise<Grievance[]> {
    const res = await fetch(BASE_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch grievances: ${res.status}`);
    return res.json();
  },

  /**
   * Fetch a single grievance by ID.
   */
  async getGrievanceById(id: string): Promise<Grievance | null> {
    const res = await fetch(`${BASE_URL}/${id}`, { cache: 'no-store' });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to fetch grievance ${id}: ${res.status}`);
    return res.json();
  },

  /**
   * Submit a new grievance via the API.
   */
  async createGrievance(formData: GrievanceFormData): Promise<Grievance> {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(`Failed to create grievance: ${res.status}`);
    return res.json();
  },

  /**
   * Update the status of a grievance (admin only).
   */
  async updateGrievanceStatus(
    id: string,
    status: GrievanceStatus
  ): Promise<Grievance | null> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`Failed to update status for ${id}: ${res.status}`);
    return res.json();
  },

  /**
   * Compute dashboard statistics from all grievances.
   */
  async getStats(): Promise<GrievanceStats> {
    const grievances = await this.getAllGrievances();
    return grievances.reduce(
      (acc, g) => {
        acc.total += 1;
        if (g.status === 'Open') acc.open += 1;
        else if (g.status === 'In Progress') acc.inProgress += 1;
        else if (g.status === 'Resolved') acc.resolved += 1;
        return acc;
      },
      { total: 0, open: 0, inProgress: 0, resolved: 0 } as GrievanceStats
    );
  },
};
