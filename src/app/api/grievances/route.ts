import { NextResponse } from 'next/server';
import { Grievance } from '@/types/grievance';

// ============================================================
// API Route: /api/grievances
// Methods: GET, POST
//
// Data Persistence: In-memory server-side store (mock backend).
// NOTE: This resets on server restart. The client application
// additionally uses localStorage for full browser-side
// persistence across page refreshes.
//
// For production: replace `grievancesStore` with a database
// (e.g. PostgreSQL, MongoDB, or Firebase).
// ============================================================

// In-memory mock data store (seeded with sample data)
let grievancesStore: Grievance[] = [
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

/**
 * GET /api/grievances
 * Returns all submitted grievances.
 */
export async function GET() {
  return NextResponse.json(grievancesStore);
}

/**
 * POST /api/grievances
 * Creates a new grievance and adds it to the store.
 * Body: { fullName, email, phone, subject, category, priority, description }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Generate next serial ID (GRV-1001, GRV-1002, ...)
    const nextNumber =
      grievancesStore.length > 0
        ? Math.max(
            ...grievancesStore.map((g) =>
              parseInt(g.id.replace('GRV-', ''), 10)
            )
          ) + 1
        : 1001;
    const newId = `GRV-${nextNumber}`;

    const newGrievance: Grievance = {
      id: newId,
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

    grievancesStore = [newGrievance, ...grievancesStore];
    return NextResponse.json(newGrievance, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create grievance. Please try again.' },
      { status: 500 }
    );
  }
}
