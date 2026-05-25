import { NextResponse } from 'next/server';
import { GrievanceStatus } from '@/types/grievance';
import { store } from '@/lib/store';

// ============================================================
// API Route: GET  /api/grievances/[id]
//            PATCH /api/grievances/[id]
//
// Data layer: shared in-memory store (src/lib/store.ts)
// ============================================================

/**
 * GET /api/grievances/[id]
 * Returns a single grievance by its ID.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const grievance = store.getById(id);

  if (!grievance) {
    return NextResponse.json(
      { error: `Grievance with ID "${id}" was not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(grievance);
}

/**
 * PATCH /api/grievances/[id]
 * Updates the status of a grievance.
 *
 * Expected body: { status: 'Open' | 'In Progress' | 'Resolved' }
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body as { status: GrievanceStatus };

    const validStatuses: GrievanceStatus[] = ['Open', 'In Progress', 'Resolved'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Allowed values: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updated = store.updateStatus(id, status);
    if (!updated) {
      return NextResponse.json(
        { error: `Grievance with ID "${id}" was not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: 'Failed to update grievance status.' },
      { status: 500 }
    );
  }
}

// PUT is an alias for PATCH — supports legacy clients
export { PATCH as PUT };
