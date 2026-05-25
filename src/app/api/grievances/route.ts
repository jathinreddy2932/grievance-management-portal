import { NextResponse } from 'next/server';
import { Grievance } from '@/types/grievance';

// In-memory server mock data array
let grievancesMemory: Grievance[] = [
  {
    id: 'GRV-1001',
    fullName: 'Ramesh Kumar',
    email: 'ramesh.kumar@email.com',
    phone: '9876543210',
    subject: 'Street light not working in Sector 4',
    category: 'Complaint',
    priority: 'High',
    description: 'The street light near House 412 has been broken for over two weeks. It gets very dark in the evening, making it unsafe for elders to walk.',
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
    description: 'The new web portal is very simple and easy to use. The large fonts make reading effortless. Thank you for making it accessible.',
    status: 'Resolved',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(grievancesMemory);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const nextNumber = grievancesMemory.length > 0
      ? Math.max(...grievancesMemory.map((g) => parseInt(g.id.replace('GRV-', ''), 10))) + 1
      : 1001;
    const newId = `GRV-${nextNumber}`;

    const newGrievance: Grievance = {
      id: newId,
      fullName: body.fullName || 'Anonymous',
      email: body.email || 'no-email@email.com',
      phone: body.phone || '',
      subject: body.subject || 'No Subject',
      category: body.category || 'Complaint',
      priority: body.priority || 'Medium',
      description: body.description || '',
      status: 'Open',
      createdAt: new Date().toISOString(),
    };

    grievancesMemory = [newGrievance, ...grievancesMemory];
    return NextResponse.json(newGrievance, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create grievance' }, { status: 500 });
  }
}
