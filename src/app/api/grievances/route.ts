import { NextResponse } from 'next/server';
import { Grievance } from '@/types/grievance';
import { store } from '@/lib/store';

// ============================================================
// API Route: GET /api/grievances
//            POST /api/grievances
//
// Data layer: shared in-memory store (src/lib/store.ts)
// See store.ts for notes on production database replacement.
// ============================================================

/**
 * GET /api/grievances
 * Returns all submitted grievances ordered newest first.
 */
export async function GET() {
  const grievances = store.getAll();
  return NextResponse.json(grievances);
}

/**
 * POST /api/grievances
 * Creates a new grievance.
 *
 * Expected body: {
 *   fullName: string
 *   email: string
 *   phone?: string
 *   subject: string
 *   category: 'Complaint' | 'Feedback' | 'Suggestion'
 *   priority: 'Low' | 'Medium' | 'High'
 *   description: string
 * }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newGrievance: Grievance = {
      id: store.nextId(),
      fullName: body.fullName || 'Anonymous',
      email: body.email || 'no-email@example.com',
      phone: body.phone || '',
      subject: body.subject || 'No Subject',
      category: body.category || 'Complaint',
      priority: body.priority || 'Medium',
      description: body.description || '',
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    const created = store.create(newGrievance);
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create grievance. Please check your input and try again.' },
      { status: 500 }
    );
  }
}
