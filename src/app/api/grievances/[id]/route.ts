import { NextResponse } from 'next/server';
import { GrievanceStatus } from '@/types/grievance';

// ============================================================
// API Route: /api/grievances/[id]
// Methods: GET, PATCH
//
// These are server-side API handlers for individual grievance
// operations. The client app primarily uses localStorage for
// persistence; these routes serve as the documented REST API.
// ============================================================

/**
 * GET /api/grievances/[id]
 * Returns a single grievance by ID.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // In a real app: query database by id
  // For this mock: return a representative response
  return NextResponse.json({
    id,
    message: `Fetch grievance ${id} from your data store.`,
    note: 'In production, replace this with a real database query.',
  });
}

/**
 * PATCH /api/grievances/[id]
 * Updates the status of a grievance by ID.
 * Body: { status: 'Open' | 'In Progress' | 'Resolved' }
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
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    // In a real app: update database record
    // For this mock: confirm the update was received
    return NextResponse.json({
      id,
      status,
      updatedAt: new Date().toISOString(),
      message: `Status of grievance ${id} updated to "${status}".`,
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to update grievance status.' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/grievances/[id]
 * Alias for PATCH — supports legacy PUT-based status updates.
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return PATCH(request, { params });
}
